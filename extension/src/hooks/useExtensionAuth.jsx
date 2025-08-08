import { useEffect, useState } from "react";

export default function useExtensionAuth() {
  const [authData, setAuthData] = useState({ user: null, token: null });

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get(["user", "token"], (result) => {
        setAuthData({
          user: result.user || null,
          token: result.token || null,
        });
      });
    } else {
      console.warn("chrome.storage.local is not available in this environment.");
    }
  }, []);

  return authData;
}
