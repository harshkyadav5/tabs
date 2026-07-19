import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getArchivedItems } from "../services/archiveService";
import { getTrashItems } from "../services/trashService";

const ArchiveTrashContext = createContext();

export const useArchiveTrash = () => useContext(ArchiveTrashContext);

export function ArchiveTrashProvider({ children }) {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [archivedItems, setArchivedItems] = useState([]);
  const [trashedItems, setTrashedItems] = useState([]);

  const refreshArchive = useCallback(async () => {
    if (!isLoggedIn) {
      setArchivedItems([]);
      return;
    }
    try {
      const data = await getArchivedItems();
      setArchivedItems(data || []);
    } catch {
      setArchivedItems([]);
    }
  }, [isLoggedIn]);

  const refreshTrash = useCallback(async () => {
    if (!isLoggedIn) {
      setTrashedItems([]);
      return;
    }
    try {
      const data = await getTrashItems();
      setTrashedItems(data || []);
    } catch {
      setTrashedItems([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshArchive();
    refreshTrash();
  }, [refreshArchive, refreshTrash]);

  return (
    <ArchiveTrashContext.Provider
      value={{
        archivedItems,
        trashedItems,
        archivedCount: archivedItems.length,
        trashedCount: trashedItems.length,
        refreshArchive,
        refreshTrash,
      }}
    >
      {children}
    </ArchiveTrashContext.Provider>
  );
}
