const mainWorld = {};

document.addEventListener("mainWorldLoad", (e) => {
  // mainWorld.window = e.detail.window;
  console.log(e);
  // mainWorld.document = e.document;
})

const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
script.onload = function () {
  script.remove();
}

document.querySelector("head").appendChild(script);

function neutralizeBlockers_all() {
  const { window } = mainWorld;
  const $ = window.$;

  var events = $._data(document.getElementsByTagName('body')[0], "events");
  var maliciousEvents = [...events.keydown, ...events.contextmenu];
  maliciousEvents.forEach(maliciousEvent => {
    maliciousEvent.handler = $.noop;
  });
}

function neutralizeBlockers_settings(settings) {
  const { window } = mainWorld;
  const $ = window.$;

  var events = $._data(document.getElementsByTagName('body')[0], "events" );
  var eventsArray = Object.values(events).reduce((acc, subEvents) => [...acc, ...subEvents]);
  var maliciousEvents = eventsArray.filter(h => {
    return settings.GUIDs.includes(h.guid);
  });
  maliciousEvents.forEach(maliciousEvent => {
    maliciousEvent.handler = $.noop;
  });
}

function _subscribeAll() {
  const timerId = setInterval(() => neutralizeBlockers_all(), 500);
  chrome.storage.sync.set({ timerId });
}

function _subscribeSettings(settings) {
  const timerId = setInterval(() => neutralizeBlockers_settings(settings), 500);
  chrome.storage.sync.set({ timerId });
}

const savedSettings = localStorage.getItem("settings");

if (savedSettings) {
  const settings = JSON.parse(savedSettings)
  _subscribeSettings(settings);
} else {
  _subscribeAll();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "neutralize_blockers_all") {
    chrome.storage.sync.get(['timerId'], ({ timerId }) => {
      if (timerId) clearInterval(timerId);
      _subscribeAll();
    })
  }

  if (message.type === "request_success") {
    chrome.storage.sync.get(['timerId'], ({ timerId }) => {
      if (timerId) clearInterval(timerId);
      _subscribeSettings(message.payload);
    })
  }
});
