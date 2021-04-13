var events = $._data( document.getElementsByTagName('body')[0], "events" );

var eventsArray = Object.values(events).reduce((acc, subEvents) => [...acc, ...subEvents]);

var maliciousGUIDs = [66, 67, 68];
var maliciousEvents = eventsArray.filter(h => {
    return maliciousGUIDs.includes(h.guid);
});

maliciousEvents.forEach(maliciousEvent => {
    maliciousEvent.handler = e => console.log("Fuck copyright pigs.");
});