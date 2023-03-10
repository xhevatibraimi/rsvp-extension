const rsvpConverter = new RSVPConverter();
console.log(rsvpConverter);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.kind === "log") {
    console.log(message.payload);
  } else if (message.kind === "alert") {
    alert(message.payload);
  }
  else if (message.kind === "invoke") {
    if (message.payload.action === "convert-default") {
      rsvpConverter.convertDefault("body");
    }
  }
});
