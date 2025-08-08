export function saveAuthToExtension(user, token) {
  chrome.storage.local.set({ user, token });
}

export function logoutFromExtension() {
  chrome.storage.local.remove(["user", "token"]);
}

export function clearExtensionStorage() {
  chrome.storage.local.clear();
}
