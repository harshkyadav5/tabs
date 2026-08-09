export function notifyDataChange(entity) {
  if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) return;

  try {
    chrome.runtime.sendMessage({ type: "DATA_CHANGED", entity }, () => {
      void chrome.runtime.lastError;
    });
  } catch {}
}
