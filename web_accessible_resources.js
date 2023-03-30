

{
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
    const widgetContainer = document.querySelector("livelike-widgets")
    const chatContainer = document.querySelector('livelike-chat');
    const widgetList = []
    widgetTags.forEach((tag)=> {
        const widgets = document.querySelectorAll(tag);
        if(widgets && widgets.length > 0){
            widgets.forEach((widget)=> {
                widgetList.push({
                    id: widget.widgetId,
                    kind: widget.kind
                })
            })
        }
    })
    const user = window.LiveLike?.userProfile;

    const programid = widgetContainer?.programid;
    const program = window.LiveLike?._$$?.progResource?.[programid];

    const chatRoomId = chatContainer?.roomid;
    const chatRoom = window.LiveLike?._$$?.chatRooms?.[chatRoomId];
    
    const obj = { 
        from: 'web_accessible_resources.js', 
        LiveLike: window.LiveLike,
        programs: !!program && [{
            id: program.id,
            name: program.title
        }],
        chatRooms: !!chatRoom && [{
            id: chatRoom.id,
            name: chatRoom.title
        }],
        widgets: widgetList,
        user: {
            id: user?.id,
            accessToken: user?.access_token,
            nickname: user?.nickname
        }
    }
    const parsed = JSON.parse(JSON.stringify(obj));
    window.postMessage(parsed)
}