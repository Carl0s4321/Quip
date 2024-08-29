import { Client, Account, Avatars} from 'appwrite';

export const client = new Client();

const projectUrl = import.meta.env.VITE_APPWRITE_URL;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client
    .setEndpoint(projectUrl)
    .setProject(projectId);

export const avatar = new Avatars(client);
export const account = new Account(client);
export { ID } from 'appwrite';
