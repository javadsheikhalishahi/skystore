"use server";

import { avatarPlaceholderUrl } from "@/constants";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
    const { databases  } = await createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
  };

    const handleError = (error: unknown, message: string) => {
        console.log(error, message);
        throw error;
    }

    export const sendEmailOTP = async ({ email }: { email: string}) => {
        const { account } = await createAdminClient();

        try {
            const session = await account.createEmailToken(ID.unique(), email)
            
            return session.userId;
        } catch (error) {
            handleError(error, "Failed to send email OTP");
        }
    };

    export const createAccount = async ({
        fullName,
        email,
      }: {
        fullName: string;
        email: string;
      }) => {
        const existingUser = await getUserByEmail(email);
      
        if (existingUser) {
          throw new Error("Email already in use"); // Early return if user exists
        }
      
        const accountId = await sendEmailOTP({ email });
        if (!accountId) throw new Error("Failed to send an OTP");
      
        const { databases } = await createAdminClient();
      
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          ID.unique(),
          {
            fullName,
            email,
            avatar: avatarPlaceholderUrl,
            accountId,
          }
        );
      
        return parseStringify({ accountId });
      };
      

export const verifySecret = async ({ accountId, password}: { accountId: string; password: string;}) => {
    try {
     const { account } = await createAdminClient();
     const session = await account.createSession(accountId, password);
     (await cookies()).set('appwrite-session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true
     });

     return parseStringify({ sessionId: session.$id});
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
};

export const signInUser = async ({ email }: { email: string }) => {
    try {
      const existingUser = await getUserByEmail(email);
  
      if (!existingUser) {
        return parseStringify({ accountId: null, error: "Email not found" });
      }
  
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    } catch (error) {
      handleError(error, "Failed to sign in user");
    }
  };
  
  export const getCurrentUser = async () => {
    const { databases, account } = await createSessionClient();
    const result = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0 ) return null;

    return parseStringify(user.documents[0]);
  }