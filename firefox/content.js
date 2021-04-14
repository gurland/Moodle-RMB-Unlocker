"use strict";

function neutralizeBlockers() {
    const $ = window.wrappedJSObject.$;

    var events = $._data(window.wrappedJSObject.document.getElementsByTagName('body')[0], "events");
    var maliciousEvents = [...events.keydown, ...events.contextmenu];
    maliciousEvents.forEach(maliciousEvent => {
        maliciousEvent.handler = $.noop;
    });
}

setInterval(neutralizeBlockers, 500);


browser.runtime.onMessage.addListener(request => {
    const action = request.action;
    switch (action) {
        case "neutralize_blockers":
            neutralizeBlockers();
            break;

        default:
            break;
    }

    return Promise.resolve({ response: "Neutralized! You are free now." });
});