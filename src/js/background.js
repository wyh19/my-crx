var validRule = /^\d+$/

chrome.contextMenus.create({
    title: '校验',
    contexts: ['editable'],
    onclick: function (params) {
        console.log(params)
        var value = params.selectionText
        if (!validRule.test(value)) {
            notify('输入不合法')
        }
    }
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    notify(request)
});

function notify(msg) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/icon.png',
        title: '提示',
        message: msg
    });
}