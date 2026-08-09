import axiosInstance from "../utils/axiosInstance";

export const getSavedColors = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/colors", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch saved colors");
  }
};

export const createSavedColor = async (colorData) => {
  try {
    const response = await axiosInstance.post("/colors", colorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create saved color");
  }
};
