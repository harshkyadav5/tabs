const EXTENSION_ID = import.meta.env.VITE_EXTENSION_ID;

const canReachExtension = () =>
  Boolean(EXTENSION_ID) && typeof chrome !== "undefined" && chrome.runtime?.sendMessage;

export const notifyExtensionLogin = (user, token) => {
  if (!canReachExtension()) return;

  try {
    chrome.runtime.sendMessage(EXTENSION_ID, { type: "AUTH_DATA", user, token }, () => {
      void chrome.runtime.lastError;
    });
  } catch {
    // Extension not installed or unreachable - ignore, the web app doesn't depend on it.
  }
};

export const notifyExtensionLogout = () => {
  if (!canReachExtension()) return;

  try {
    chrome.runtime.sendMessage(EXTENSION_ID, { type: "LOGOUT" }, () => {
      void chrome.runtime.lastError;
    });
  } catch {
    // Extension not installed or unreachable — ignore, the web app doesn't depend on it.
  }
};
