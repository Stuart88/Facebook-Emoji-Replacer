"use strict";
// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages
chrome.webNavigation.onCompleted.addListener((tab) => {
    var _a;
    if (tab.url.indexOf("facebook.com/") > -1) {
        chrome.scripting.executeScript({
            target: { tabId: (_a = tab.tabId) !== null && _a !== void 0 ? _a : 0, allFrames: true },
            files: ["emojiReplace.js"],
        });
    }
});
