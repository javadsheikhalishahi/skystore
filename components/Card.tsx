import { convertFileSize } from "@/lib/utils";
import Link from "next/link";
import { Models } from "node-appwrite";
import ActionDropdown from "./ActionDropdown";
import FormattedDateTime from "./FormattedDateTime";
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
            <ActionDropdown file={file} />
            <p className="text-[14px] leading-[24px] font-normal">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="details-card-file">
        <p className="text-[14px] leading-[20px] font-semibold line-clamp-1">
         {file.name}
        </p>
        <FormattedDateTime date={file.$createdAt} className="text-[14px] leading-[20px] font-normal text-light-100" />
        <p className="text-[12px] leading-[16px] font-normal line-clamp-1 text-gray-400">By : {file.owner.fullName}</p>
      </div>
    </Link>
  );
};

export default Card;
