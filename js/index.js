/// This checks all the opened tabs which might be useful later on further development
// chrome.tabs.query({currentWindow: true}, function(tabs) {
//     tabs.forEach(function(tab) {
//         if (tab.active == true) {
//             console.log("currently Active Tab is");
//             console.log(tab.id);
//             console.log(tab.url);
//         }
//     });
// });

var sTime = new Date();
var fTime = new Date();

function printTimeStamp(startTime, endTime) {
    var a = parseInt((fTime-sTime)/1000 | 0);
    console.log(a);
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function getURLData(url) {
    chrome.storage.local.get([url], function(result) {
        return result.key
        // console.log(result.key);
      });
}


chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
        // console.log(tab.url);
        var urlLink = getHostName(tab.url);
        console.log(urlLink);
        fTime = new Date();
        printTimeStamp(sTime, fTime);
        difTime = fTime-sTime;
        sTime = fTime;
    });
});

whale.sidebarAction.onClicked.addListener(result => {
    if (result.opened == true) {
        console.log("yes");
    } else {
        console.log("no")
    }
  // result.opened: 사이드바가 열렸는지 닫혔는지를 알려주는 boolean 값. 열렸으면 true.
});