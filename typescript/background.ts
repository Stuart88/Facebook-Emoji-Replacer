"use strict";

// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.webNavigation.onCompleted.addListener((tab) => {
  if (tab.url.indexOf("facebook.com/") > -1) {
    chrome.scripting.executeScript({
      target: { tabId: tab.tabId ?? 0, allFrames: true },
      files: ["emojiReplace.js"],
    });
  }
});
