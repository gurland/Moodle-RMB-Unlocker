const settingsUrl = 'https://raw.githubusercontent.com/gurland/Moodle-RMB-Unlocker/master/settings.json';

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "neutralize_blockers_request") {
    loadSettings();
  }
});

async function loadSettings() {
  try {
    const response = await fetch(settingsUrl);
    const settings = await response.json();

    localStorage.setItem("settings", JSON.stringify(settings));
    chrome.runtime.sendMessage({ type: "request_success", payload: settings });
  } catch (e) {
    chrome.runtime.sendMessage({ type: "request_success", payload: e.message });
  }
}
