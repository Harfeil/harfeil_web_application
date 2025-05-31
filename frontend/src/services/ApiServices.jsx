import axiosInstance from "../axios/AxiosInstance";

export const getData = async (endpoint, id = null) => {
  const url = id ? `${endpoint}/${id}/` : `${endpoint}/`;
  const res = await axiosInstance.get(url);
  return res.data;
};

// POST (create)
export const createData = async (endpoint, payload) => {
  const res = await axiosInstance.post(`${endpoint}/`, payload);
  return res.data;
};

// PUT (update)
export const updateData = async (endpoint, id, payload) => {
  const res = await axiosInstance.put(`${endpoint}/${id}/`, payload);
  return res.data;
};

// DELETE
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