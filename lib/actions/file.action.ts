"use server";

import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getFileType } from "../utils";

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();

    try {
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);
        const fileDocument = {
           type: getFileType(bucketFile.name).type,
           name: bucketFile.name,
           url: constructFileUrl(bucketFile.$id),
        }
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
};
