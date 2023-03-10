const sendMessage = (kind, payload) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { kind, payload });
  });
};

const log = (payload) => sendMessage("log", payload);

const alert = (payload) => sendMessage("alert", payload);

const invoke = (payload) => sendMessage("invoke", payload);

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector("#button-convert");
  checkbox.addEventListener("click", () => {
    invoke({ action: "convert-default" });
  });
});
