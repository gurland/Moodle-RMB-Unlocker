"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

function broadcastNeutralization(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { action: "neutralize_blockers" }
        ).then(response => {
            console.log(response.response);
        }).catch(onError);
    }
}

const neutralizeButton = document.getElementById("neutralizeButton");
neutralizeButton.addEventListener("click", async () => {
    const tabs = await browser.tabs.query({});
    await broadcastNeutralization(tabs);
});