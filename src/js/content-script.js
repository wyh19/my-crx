var validRule = /^\d+$/

document.addEventListener('DOMContentLoaded', function()
{
    $('#test').change(function(e){
        var value = e.target.value
        if(!validRule.test(value)){
            sendMessageToBackground('输入不合法')
        }
    })
})


// 主动发送消息给后台
function sendMessageToBackground(message) {
	chrome.runtime.sendMessage(message)
}
