import axiosInstance from "../utils/axiosInstance";

export async function createMeeting(
  judul,
  tanggal,
  tempat,
  audiens,
  start_time,
  end_time,
  keterangan,
  room_id
) {
  try {
    const meetingRequest = {
      judul,
      tanggal,
      tempat,
      audiens,
      start_time,
      end_time,
      keterangan,
      room_id,
    };

    const { status, data } = await axiosInstance.post(
      "/meeting",
      meetingRequest
    );

    if (status === 201) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: error.status,
      message: error.response.data.message,
    };
  }
}

export async function getAllMeeting() {
  try {
    const { status, data } = await axiosInstance.get("/meeting");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function getLobbyMeeting() {
  try {
    const { status, data } = await axiosInstance.get("/meeting/lobby");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

// Change for better running text implementation
export async function getRunningText() {
  try {
    const { status, data } = await axiosInstance.get("/meeting/running-text");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function updateMeeting(
  id,
  judul,
  tanggal,
  tempat,
  audiens,
  start_time,
  end_time,
  keterangan
) {
  try {
    const meetingRequest = {
      judul,
      tanggal,
      tempat,
      audiens,
      start_time,
      end_time,
      keterangan,
    };

    const { status, data } = await axiosInstance.put(
      `/meeting/${id}`,
      meetingRequest
    );

    if (status === 201) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function getMeetingById(id) {
  try {
    const { status, data } = await axiosInstance.get(`/meeting/${id}`);

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function deleteMeetingById(id) {
  try {
    const { status, data } = await axiosInstance.delete(`/meeting/${id}`);

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}
