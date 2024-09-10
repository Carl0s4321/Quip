import { Client, Account, Avatars, Databases} from 'appwrite';

const client = new Client();

const projectUrl = import.meta.env.VITE_APPWRITE_URL;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TASKS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_TASKS_ID;
const FRIENDREQUESTS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_FRIENDREQUESTS_ID;
const BOARDINVITATIONS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_BOARDINVITATIONS_ID;
const BOARDS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_BOARDS_ID;
// const TODO_ID = import.meta.env.VITE_APPWRITE_COLLECTION_TODO_ID;
// const INPROGRESS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_INPROGRESS_ID;
// const DONE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_DONE_ID;
const MESSAGES_ID = import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGES_ID;
const USERPROFILES_ID = import.meta.env.VITE_APPWRITE_COLLECTION_USERPROFILES_ID;

client
    .setEndpoint(projectUrl)
    .setProject(PROJECT_ID);

const avatar = new Avatars(client);
const account = new Account(client);
const databases = new Databases(client);

export {
    avatar,
    account,
    databases,
    PROJECT_ID,
    DATABASE_ID,
    TASKS_ID,
    FRIENDREQUESTS_ID,
    BOARDINVITATIONS_ID,
    BOARDS_ID,
    // TODO_ID,
    // INPROGRESS_ID,
    // DONE_ID,
    MESSAGES_ID,
    USERPROFILES_ID,
  };

export { ID } from 'appwrite';
