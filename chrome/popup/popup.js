const neutralizeButtonAll = document.getElementById("neutralizeButtonAll");
const neutralizeButtonRequest = document.getElementById("neutralizeButtonRequest");

const errorSpan = document.getElementById("error");

neutralizeButtonAll.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "neutralize_blockers_all" });
});

neutralizeButtonRequest.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "neutralize_blockers_request" });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "request_error") {
    errorSpan.innerText = message.payload;
  }
})
