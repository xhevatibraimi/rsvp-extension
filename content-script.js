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
