import axiosInstance from "../utils/axiosInstance";

export async function getAllRoom() {
  try {
    const { status, data } = await axiosInstance.get("/room");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}
