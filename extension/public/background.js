chrome.runtime.onInstalled.addListener(() => {
  console.log("Tabs Extension installed.");
});

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === "AUTH_DATA") {
    const { user, token } = message;

    chrome.storage.local.set({ user, token }, () => {
      console.log("Auth data stored in extension.");
      sendResponse({ status: "success" });
    });

    return true;
  }
});
