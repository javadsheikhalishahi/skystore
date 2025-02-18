import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    /*Document*/
    case "pdf":
      return "/assets/icons/pdf-document.svg";
    case "doc":
      return "/assets/icons/doc-document.svg";
    case "docx":
      return "/assets/icons/doc-document.svg";
    case "csv":
      return "/assets/icons/csv-file-document.svg";
    case "txt":
      return "/assets/icons/txt-document.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";  
    /* Image */
    case "svg":
      return "/assets/icons/images-file.svg";
    /*video */
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/video-files.svg";
    /*Audio*/
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/audio-files.svg";

    default: switch (type) {
      case "image":
        return "/assets/icons/images-file.svg";
      case "document":
        return "/assets/icons/file-document.svg";
      case "video":
        return "/assets/icons/video-files.svg";
      case "audio":
        return "/assets/icons/audio-files.svg";
      default:
        return "/assets/icons/other-file.svg";
    }
  }
};

/* constructFileUrl */
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

/* convertFileSize */
export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + "Bytes";
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + "KB";
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + "MB";
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + "GB";
  }
};

/* formatDateTime */
export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "-";

  const date = new Date(isoString);
  let hours = date.getHours();
  const minute = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  const time = `${hours}:${minute.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

/* constructDownloadUrl  */
export const constructDownloadUrl  = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];  
  }
};

/* calculatePercentage   */
export const calculatePercentage  = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024;
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;

  return Number(percentage.toFixed(2));
};

/* Dashboard   */
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-dashboard.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-dashboard.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate: totalSpace.video.latestDate > totalSpace.audio.latestDate
        ? totalSpace.video.latestDate
        : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-dashboard.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-ldashboard.svg",
      url: "/others",
    },
  ]
}

export const groupFilesByDate = (files: any[], period = "day") => {
  const grouped: { [key: string]: { [key: string]: number } } = {}; 

  files.forEach((file) => {
    const date = new Date(file.$createdAt);
    let fileType = getFileType(file.name).type; 

    // Merge video and audio into "media"
    if (fileType === "video" || fileType === "audio") {
      fileType = "media";
    }

    const key =
      period === "day"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!grouped[key]) {
      grouped[key] = { image: 0, document: 0, media: 0, other: 0 }; 
    }

    grouped[key][fileType] = (grouped[key][fileType] || 0) + 1; 
  });

  return Object.entries(grouped).map(([date, types]) => ({
    date,
    image: types.image,
    document: types.document,
    media: types.media,
    other: types.other,
  }));
};


export const countFileTypes = (files: any[]) => {
  const counts: { [key: string]: number } = {};

  files.forEach((file) => {
    const ext = file.extension || "other";
    counts[ext] = (counts[ext] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([extension, count]) => ({ extension, count }))
    .sort((a, b) => b.count - a.count);
};
