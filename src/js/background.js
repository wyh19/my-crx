chrome.contextMenus.create({
	title: '设为校验对象', 
	contexts: ['editable'], 
	onclick: function(params,info)
	{
		alert(JSON.stringify(params))
		alert(JSON.stringify(info))
    }
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	notify(request)
});

function notify (msg){
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/icon.png',
        title: '提示',
        message: msg
    });
}