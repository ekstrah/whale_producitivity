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
var webDict = new Object();
var sTime = new Date();
var fTime = new Date();
var initPage = 0;
var link = null;

function printTimeStamp(startTime, endTime) {
    var a = parseInt((fTime-sTime)/1000 | 0);
    return a
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

document.addEventListener('DOMContentLoaded', function() {
        var link = document.getElementById('refresh_sync_data');
        // onClick's logic below:
        link.addEventListener('click', function() {
            whale.storage.sync.clear(function() {
                var error = whale.runtime.lastError;
                if (error) {
                    console.error(error);
                }
            });
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        var link = document.getElementById('get_all_keyz');
        // onClick's logic below:
        link.addEventListener('click', function() {
            chrome.storage.sync.get(null, function(items) {
                var allKeys = Object(items);
                console.log(allKeys);
            });
        });
    });


function getURLData(webDict) {
    whale.storage.sync.get("key", function(result) {
        console.log(result);
        // console.log('Value currently is ' + result.key);
      });
}

function setURLData(webDict) {
    whale.storage.sync.set({"key": webDict}, function() {
        console.log('Value is set to ' + webDict);
      });
}

whale.tabs.onActivated.addListener(function(info) {
    var tab = whale.tabs.get(info.tabId, function(tab) {
        if (link == null) {
            link = getHostName(tab.url);
        } else {
            // console.log(tab.url);
            link = getHostName(tab.url);
            
            fTime = new Date();
            timeInterval = printTimeStamp(sTime, fTime);

            webDict[prevLink] = timeInterval;


            sTime = fTime;
        }
        console.log(webDict);
        prevLink = link;
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