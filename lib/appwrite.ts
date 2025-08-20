import { CreateUserParams, SignInParams, User } from "@/types";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
  Platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || "",
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID || "",
  // cartCollectionId:  process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID || "",
  // orderCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ORDER_COLLECTION_ID || "",
  // orderItemCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ORDER_ITEM_COLLECTION_ID || "",  
  customisationCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMISATION_COLLECTION_ID || "", 
  menuCustomisationCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMISATION_COLLECTION_ID || "",
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID || "",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.Platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);

export const createUser = async (userData: CreateUserParams) => {
  try {
    const response = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.name
    );
    if (!response) throw Error;
    await signIn({ email: userData.email, password: userData.password });

    const avatarUrl = avatar.getInitialsURL(userData.name);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name: userData.name,
        email: userData.email,
        avatar: avatarUrl,
        accountId: response.$id,
      }
    );
    return newUser;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user");
  }
};

export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<void> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get(); // Get the current user session
    if (!currentAccount) throw Error;
    const user = await databases.listDocuments<User>(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);
    if (!user) throw Error;

    return user.documents[0]; //as unknown as User; // Return the user document
  } catch (error: any) {
    throw new Error(error.message || "Failed t o get current user");
  }
};


