import axiosInstance from "../utils/axiosInstance";

export async function getAllAudience() {
  try {
    const { status, data } = await axiosInstance.get("/audience");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function createAudience(name) {
  try {
    const { status, data } = await axiosInstance.post("/audience", { name });

    if (status === 201) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}
