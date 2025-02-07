declare type FileType = "document" | "image" | "audio" | "video" | "other";

declare interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}

declare interface SearchParamProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined}>;
}

declare interface ActionType {
    label: string;
    icon: string;
    value: string;
}