document.addEventListener(`visibilitychange`, function() {
    if (document.visibilityState === `visible`) {
        whale.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
            var url = tabs[0].url;
            console.log(url);
        });
        console.log("tap opened")
    } else {
        console.log("side bar closed");
    }
});