import { Client } from "node-appwrite"
import { appwriteConfig } from "./config"

export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId)
}