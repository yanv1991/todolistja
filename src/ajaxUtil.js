var ajaxUtil = (function() {
    function AjaxRequest (url, callback, failCallback) {
        var xmlhttp;

        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200)
                    callback(JSON.parse(xmlhttp.responseText), url);
                else
                    failCallback(url);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function AjaxRequestsMulti (urls, callbackMulti, failCallbackMulti) {
        var isAllCallsCompleted = false;
        var isCallFailed = false;
        var data = {};

        for (var i = 0; i < urls.length; i++) {
            var callback = function(responseText, url) {
                if (isCallFailed) return;

                data[url] = responseText;

                // get size of data
                var size = 0;
                for (var index in data) {
                    if (data.hasOwnProperty(index))
                        size++;
                }

                if (size == urls.length)
                // all AJAX requests are completed successfully
                    callbackMulti(data);
            };

            var failCallback = function(url) {
                isCallFailed = true;
                failCallbackMulti(url);
            };

            AjaxRequest(urls[i], callback, failCallback);
        }
    }

    return {
      ajaxRequest: AjaxRequestsMulti
    };
})();
