const loadButton = document.getElementById("loadSettings");
const settingsUrl = 'https://raw.githubusercontent.com/gurland/Moodle-RMB-Unlocker/master/settings.json';

loadButton.addEventListener("click", async () => {
  console.log("qweqwe");
  await loadSettings();
});

function runScript() {
  const settings = JSON.parse(localStorage.getItem("settings"));

  if (settings) {
    var events = $._data( document.getElementsByTagName('body')[0], "events" );
    var eventsArray = Object.values(events).reduce((acc, subEvents) => [...acc, ...subEvents]);
    var maliciousEvents = eventsArray.filter(h => {
      return settings.GUIDs.includes(h.guid);
    });
    maliciousEvents.forEach(maliciousEvent => {
      maliciousEvent.handler = e => console.log("Fuck copyright pigs.");
    });
  }
}

async function loadSettings() {
  try {
    const response = await fetch(settingsUrl);
    const settings = await response.json();

    localStorage.setItem("settings", JSON.stringify(settings));
    runScript();
  } catch (e) {
    console.log(e.message);
  }
}
