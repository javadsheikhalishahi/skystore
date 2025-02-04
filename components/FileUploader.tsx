"use client";

import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
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

  const onDrop = useCallback( async(acceptedFiles: File[]) => {
   setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "button-uploader relative flex items-center gap-3 px-6 py-3 rounded-full transition-all", // Adjust padding for all screens
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
           <h4 className="text-[18px] leading-[20px] font-medium text-light-200 motion-safe:animate-bounce">Uploading</h4>

           {files.map((file, index) => {
             const { type, extension } = getFileType(file.name);

             return (
              <li key={`${file.name}-${index}`} className="preview-uploader-item">
                <div className="flex items-center gap-3">
                   <Thumbnail 
                     type={type}
                     extension={extension}
                     url={convertFileToUrl(file)}
                   />
                </div>
              </li>
             )
           })}
        </ul>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
