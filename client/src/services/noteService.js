import axiosInstance from '../utils/axiosInstance';

// Note operations
export const getNotes = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/notes', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch notes');
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axiosInstance.post('/notes', noteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create note');
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axiosInstance.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update note');
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete note');
  }
};

export const togglePin = async (id, isPinned) => {
  return updateNote(id, { is_pinned: isPinned });
};

// Folder operations
export const getNoteFolders = async () => {
  try {
    const response = await axiosInstance.get('/notes/folders');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch folders');
  }
};

export const createNoteFolder = async (folderData) => {
  try {
    const response = await axiosInstance.post('/notes/folders', folderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create folder');
  }
};

export const updateNoteFolder = async (id, folderData) => {
  try {
    const response = await axiosInstance.put(`/notes/folders/${id}`, folderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update folder');
  }
};

export const deleteNoteFolder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notes/folders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete folder');
  }
};
