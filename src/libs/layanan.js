import axiosInstance from "../utils/axiosInstance";

export async function getAllLayanan() {
  try {
    const { status, data } = await axiosInstance.get("/layanan");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function getLayananById(id) {
  try {
    const { status, data } = await axiosInstance.get(`/layanan/${id}`);

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function createLayanan(formData) {
  try {
    const { status, data } = await axiosInstance.post("/layanan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (status === 201) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    console.log(error);
    return { success: false, status: error.status, message: error.message };
  }
}

export async function updateLayanan(id, formData) {
  try {
    const { status, data } = await axiosInstance.put(
      `/layanan/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function deleteLayanan(id) {
  try {
    const { status, data } = await axiosInstance.delete(`/layanan/${id}`);

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}
