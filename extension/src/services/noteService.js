import axiosInstance from "../utils/axiosInstance";

export const createNote = async (noteData) => {
  try {
    const response = await axiosInstance.post("/notes", noteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create note");
  }
};

export const getNoteFolders = async () => {
  try {
    const response = await axiosInstance.get("/notes/folders");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch folders");
  }
};
