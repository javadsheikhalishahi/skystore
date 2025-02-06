import { convertFileSize } from "@/lib/utils";
import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="card-file">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-10"
        />

        <div className="flex flex-col items-end justify-between">
            ActionsDropdown...
            <p className="text-[16px] leading-[24px] font-normal">{convertFileSize(file.size)}</p>
        </div>
      </div>
      {file.name}
    </Link>
  );
};

export default Card;
