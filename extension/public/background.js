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

  if (message.type === "LOGOUT") {
    chrome.storage.local.remove(["user", "token"], () => {
      console.log("Auth data cleared from extension.");
      sendResponse({ status: "success" });
    });

    return true;
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (!("user" in changes) && !("token" in changes)) return;

  const user = "user" in changes ? changes.user.newValue ?? null : undefined;
  const token = "token" in changes ? changes.token.newValue ?? null : undefined;

  chrome.tabs.query({ url: "http://localhost/*" }, (tabs) => {
    for (const tab of tabs) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: (syncedUser, syncedToken) => {
            window.postMessage(
              { source: "tabs-extension", type: "AUTH_SYNC", user: syncedUser, token: syncedToken },
              window.location.origin
            );
          },
          args: [user, token],
        })
        .catch(() => {});
    }
  });
});
