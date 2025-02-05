"use client";

import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.action";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";

interface Props {
  accountId: string;
  ownerId: string;
  className?: string;
}
const FileUploader = ({ accountId, ownerId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        return toast({
          description: (
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-rose-600 text-rose-600 rounded-full shadow-xl">
                ⚠️
              </div>
              <p className="text-sm leading-5 font-medium text-gray-900 break-words">
                <span className="text-yellow-300 font-extrabold">Warning!! <br /></span> 
                <span className="font-normal text-white underline"> {file.name} </span> 
                is too large. Max file size is <span className="font-bold">50MB</span> 🤖.
              </p>
            </div>
          ),
          className: "toast-error",
        });
      }
      return uploadFile({ file, ownerId, accountId, path}).then(
        (uploadFile) => {
          if (uploadFile) {
            setFiles((prevFiles) => 
              prevFiles.filter((f) => f.name !== file.name),
          );
          }
        },
      );
    });

    await Promise.all(uploadPromises);
  }, [ownerId, accountId, path]);

  const { getRootProps, getInputProps} = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "button-uploader relative flex items-center gap-3 px-6 py-3 rounded-full transition-all", 
          "bg-transparent ring-2 ring-transparent shadow-drop-1",
          "before:absolute before:inset-0 before:rounded-full before:animate-ring-glow",
          "hover:scale-105 hover:shadow-lg",
          className
        )}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="uploader"
          width={60}
          height={60}
          className="
      motion-safe:animate-bounce 
      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-10 lg:h-10
      flex-shrink-0 
    "
        />
        <p className="text-black font-bold text-sm sm:text-base md:text-lg">
          Upload
        </p>
      </Button>
      {files.length > 0 && (
        <ul className="preview-uploader-list">
          <h4 className="text-[18px] leading-[20px] font-medium text-light-200 motion-safe:animate-bounce">
            Uploading
          </h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="preview-uploader-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="item-name-preview">
                    {file.name}
                    <Image
                      src="/assets/icons/loading.gif"
                      width={80}
                      height={26}
                      alt="loading"
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
