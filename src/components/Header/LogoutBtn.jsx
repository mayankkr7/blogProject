import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            window.location.reload(false);
            navigate("/");
        } catch (error) {
            console.error("Error occurred during logout:", error);
        }
    };

    return (
        <button
            className='inline-block px-6 mr-8 py-2 duration-200 hover:bg-blue3 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;