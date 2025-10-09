import axiosInstance from '../utils/axiosInstance';

// Bookmark operations
export const getBookmarks = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/bookmarks', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch bookmarks');
  }
};

export const createBookmark = async (bookmarkData) => {
  try {
    const response = await axiosInstance.post('/bookmarks', bookmarkData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create bookmark');
  }
};

export const updateBookmark = async (id, bookmarkData) => {
  try {
    const response = await axiosInstance.put(`/bookmarks/${id}`, bookmarkData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update bookmark');
  }
};

export const deleteBookmark = async (id) => {
  try {
    const response = await axiosInstance.delete(`/bookmarks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete bookmark');
  }
};

export const incrementViewCount = async (id) => {
  try {
    const response = await axiosInstance.patch(`/bookmarks/${id}/view`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to increment view count');
  }
};

export const togglePin = async (id) => {
  try {
    const response = await axiosInstance.patch(`/bookmarks/${id}/pin`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to toggle pin status');
  }
};

// Folder operations
export const getBookmarkFolders = async () => {
  try {
    const response = await axiosInstance.get('/bookmarks/folders');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch folders');
  }
};

export const createBookmarkFolder = async (folderData) => {
  try {
    const response = await axiosInstance.post('/bookmarks/folders', folderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create folder');
  }
};

export const updateBookmarkFolder = async (id, folderData) => {
  try {
    const response = await axiosInstance.put(`/bookmarks/folders/${id}`, folderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update folder');
  }
};

export const deleteBookmarkFolder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/bookmarks/folders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete folder');
  }
};
