import { getUser } from "../api";

export const fetchUserInfo = async (userId) => {
  try {
    const user = await getUser(userId);

    return {user, formattedId: userId.slice(-4)}
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
