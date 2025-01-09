import axiosInstance from "../utils/axiosInstance";
import { getCookie, removeCookie, setCookie } from "./cookie";

export async function login(username, password) {
  try {
    const loginRequest = {
      username,
      password,
    };

    const { status, data } = await axiosInstance.post(
      "/user/login",
      loginRequest
    );

    if (status === 200) {
      setCookie("authToken", data.token, 1);
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function register(username, password) {
  try {
    const registerRequest = {
      username,
      password,
    };

    const { status, data } = await axiosInstance.post(
      "/user/register",
      registerRequest
    );

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, message: status };
    }
  } catch (error) {
    return { success: false, error: error.status, message: error.message };
  }
}

export async function isStillAuthorized() {
  try {
    const { status, data } = await axiosInstance.get("/user/auth");

    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function logout() {
  try {
    removeCookie("authToken");
    if (!getCookie("authToken")) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
