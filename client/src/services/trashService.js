import axiosInstance from '../utils/axiosInstance';

export const getTrashItems = async () => {
  try {
    const response = await axiosInstance.get('/trash');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch trash items');
  }
};

export const restoreItem = async (entityType, entityId) => {
  try {
    const response = await axiosInstance.post(`/trash/${entityType}/${entityId}/restore`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to restore item');
  }
};

export const deleteTrashItem = async (entityType, entityId) => {
  try {
    const response = await axiosInstance.delete(`/trash/${entityType}/${entityId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete trash item');
  }
};
