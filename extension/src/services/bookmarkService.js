import axiosInstance from "../utils/axiosInstance";

export const createBookmark = async (bookmarkData) => {
  try {
    const response = await axiosInstance.post("/bookmarks", bookmarkData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create bookmark");
  }
};

export const getBookmarkFolders = async () => {
  try {
    const response = await axiosInstance.get("/bookmarks/folders");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch folders");
  }
};
