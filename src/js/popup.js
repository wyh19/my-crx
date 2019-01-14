

// popup主动发消息给content-script
function sendToContent(){
    sendMessageToContentScript('你好，我是popup！', (response) => {
        if (response) alert('收到来自content-script的回复：' + response);
    });
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));
});

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}



function saveToStorage(data) {
    chrome.storage.sync.set(data, function () {
        console.log('保存成功！');
    });
}

function getFromStorage(data, cb) {
    chrome.storage.sync.get(data, function (items) {
        cb(items);
    });
}

$(function(){
    getFromStorage({regx:''},function(data){
        $('#regx').val(data.regx)
    })

    $('#btnSave').click(function(){
        var regx = $('#regx').val()
        saveToStorage({regx})
    })
})