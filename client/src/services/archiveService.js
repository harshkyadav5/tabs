import axiosInstance from '../utils/axiosInstance';

export const getArchivedItems = async () => {
  try {
    const response = await axiosInstance.get('/archive');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch archived items');
  }
};

export const unarchiveItem = async (entityType, entityId) => {
  try {
    const response = await axiosInstance.delete(`/archive/${entityType}/${entityId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to unarchive item');
  }
};

export const deleteArchivedItem = async (entityType, entityId) => {
  try {
    const response = await axiosInstance.delete(`/archive/${entityType}/${entityId}/permanent`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete archived item');
  }
};
