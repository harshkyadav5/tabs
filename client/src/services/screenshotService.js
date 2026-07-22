import axiosInstance from '../utils/axiosInstance';

export const getScreenshots = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/screenshots', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch screenshots');
  }
};

export const createScreenshot = async (screenshotData) => {
  try {
    const response = await axiosInstance.post('/screenshots', screenshotData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create screenshot');
  }
};

export const updateScreenshot = async (id, screenshotData) => {
  try {
    const response = await axiosInstance.put(`/screenshots/${id}`, screenshotData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update screenshot');
  }
};

export const deleteScreenshot = async (id) => {
  try {
    const response = await axiosInstance.delete(`/screenshots/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete screenshot');
  }
};

export const toggleFavorite = async (id) => {
  try {
    const response = await axiosInstance.patch(`/screenshots/${id}/favorite`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to toggle favorite');
  }
};
