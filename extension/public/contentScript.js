chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (!("user" in changes) && !("token" in changes)) return;

  window.postMessage(
    {
      source: "tabs-extension",
      type: "AUTH_SYNC",
      user: "user" in changes ? changes.user.newValue ?? null : undefined,
      token: "token" in changes ? changes.token.newValue ?? null : undefined,
    },
    window.location.origin
  );
});
