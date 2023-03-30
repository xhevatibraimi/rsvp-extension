const timeout = (delay) => {
    setTimeout(()=> {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('web_accessible_resources.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.remove();
        };
    }, delay)
}

timeout(2000);

let obj;
const handleFromWeb = async (event) => {
    const {from, ...rest} = event.data;
    if (from === "web_accessible_resources.js") {
        obj = {...rest};
    }
};
window.addEventListener('message', handleFromWeb);


const widgetTags = [
    "livelike-alert",
    "livelike-cheer-meter",
    "livelike-text-ask",
    "livelike-rich-post",
    "livelike-emoji-slider",
    "livelike-social-embed",
    "livelike-video",
    "livelike-video-alert",
    "livelike-text-poll",
    "livelike-image-poll",
    "livelike-text-prediction",
    "livelike-image-prediction",
    "livelike-image-prediction-follow-up",
    "livelike-text-prediction-follow-up",
    "livelike-text-number-prediction",
    "livelike-image-number-prediction",
    "livelike-image-number-prediction-follow-up",
    "livelike-text-number-prediction-follow-up",
    "livelike-text-quiz",
    "livelike-image-quiz",
]

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if(request.kind === "getResource"){    
        sendResponse({ ...obj });
    }
    if(request.kind === "refresh"){
        timeout(0);
        setTimeout(()=> {
            sendResponse({...obj});
        },2000)
        return true;
    }
});
