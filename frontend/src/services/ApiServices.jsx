import {axiosInstance} from "../axios/AxiosInstance";

const IMAGE_BASE_URL = "http://localhost:8000/storage/"; // Update if your image base URL differs

export const createData = async (endpoint, payload) => {
  const url = `${endpoint}`;
  let res;

  try {
    if (payload instanceof File) {
      const formData = new FormData();
      formData.append('profile_picture', payload);
      res = await axiosInstance.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      res = await axiosInstance.post(url, payload);
    }
    return res.data;
  } catch (error) {
    console.error('ApiServices create error:', error);
    throw error;
  }
};

export const updateData = async (endpoint, id, payload) => {
  const url = `${endpoint}/${id}`;
  let res;

  try {
    if (payload instanceof File) {
      const formData = new FormData();
      formData.append('profile_picture', payload);
      // Debug FormData
      for (let [key, value] of formData.entries()) {
        console.log('ApiServices FormData:', key, value);
      }
      res = await axiosInstance.put(url, formData);
    } else {
      res = await axiosInstance.put(url, payload);
    }
    return res.data;
  } catch (error) {
    console.error('ApiServices update error:', error);
    throw error;
  }
};

export const getData = async (endpoint, id = null) => {
  const url = id ? `${endpoint}/${id}` : `${endpoint}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

export const deleteData = async (endpoint, id) => {
  const res = await axiosInstance.delete(`${endpoint}/${id}/`);
  return res.data;
};

export const handleLogout = async (navigate) => {
  try {
    await axiosInstance.post("/logout");  // token is sent here via interceptor
  } catch (error) {
    console.error("Logout API failed:", error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
