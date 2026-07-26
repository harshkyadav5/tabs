import { useEffect, useState } from "react";

export default function useExtensionAuth() {
  const [authData, setAuthData] = useState({ user: null, token: null, loading: true });

  useEffect(() => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      console.warn("chrome.storage.local is not available in this environment.");
      setAuthData({ user: null, token: null, loading: false });
      return;
    }

    chrome.storage.local.get(["user", "token"], (result) => {
      setAuthData({
        user: result.user || null,
        token: result.token || null,
        loading: false,
      });
    });

    const handleChange = (changes, areaName) => {
      if (areaName !== "local") return;
      if (!("user" in changes) && !("token" in changes)) return;

      setAuthData((prev) => ({
        user: "user" in changes ? changes.user.newValue || null : prev.user,
        token: "token" in changes ? changes.token.newValue || null : prev.token,
        loading: false,
      }));
    };

    chrome.storage.onChanged.addListener(handleChange);
    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, []);

  return authData;
}
