import { convertFileSize, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="details-thumbnail">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="text-[14px] leading-[20px] font-semibold mb-1">
        {file.name}
      </p>
      <FormattedDateTime
        date={file.$createdAt}
        className="text-[12px] leading-[16px] font-normal"
      />
    </div>
  </div>
);


const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="details-label">{label}</p>
    <p className="details-value">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="text-[14px] leading-[20px] font-semibold pl-2 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="input-field-share"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-[16px] leading-[24px] font-semibold text-light-100">
              Shared with
            </p>
            <p className="text-[16px] leading-[24px] font-normal text-light-200">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-[14px] leading-[24px] font-semibold">
                  {email}
                </p>
                <Button onClick={() => onRemove(email)} className="remove-user-share">
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
