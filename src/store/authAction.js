import { login } from "./features/authSlice";
import authService from "../appwrite/auth";

export const fetchUserData = () => async (dispatch) => {
  try {
    const user = await authService.getCurrentUser();
    if (user) {
      dispatch(login({ userData: user }));
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
