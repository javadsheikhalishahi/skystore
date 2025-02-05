import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string
}
const Thumbnail = ({ type, extension, url = '', imageClassName, className }: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure>
       <Image src={isImage ? url : getFileIcon(extension, type)} alt="upload-thumbnail" width={100} height={100}
        className={cn("size-8 object-contain", imageClassName, isImage && "image-thumbnail")} />
    </figure>
  )
}

export default Thumbnail
