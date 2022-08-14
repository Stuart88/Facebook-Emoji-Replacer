"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("./emojis");
function modifySpanEmojis(emoji) {
    //Modify span elements to show original emoji
    //instead of the shite FB <img> they force over it.
    // let spanEls = document.body.getElementsByTagName("span");
    let spanEls = document.querySelectorAll(`span[style*="${emoji.emojiCode}"]`);
    for (let i = 0; i < spanEls.length; i++) {
        let el = spanEls[i];
        if (el.style.backgroundImage.indexOf(emoji.emojiCode) > -1) {
            el.style.backgroundImage = "none";
            el.style.color = "initial";
        }
    }
}
function modifyImageEmojis(emoji) {
    //Some FB emojis exist purely as images.
    //Delete them and replace with a <span> containing only unicode
    var _a, _b, _c;
    let imgEls = document.querySelectorAll(`img[alt="${emoji.emojiIcon}"]`);
    for (let i = 0; i < imgEls.length; i++) {
        let el = imgEls[i];
        if (el.parentElement) {
            let newSpan = document.createElement("span");
            newSpan.innerText = emoji.emojiIcon;
            if (((_a = el.parentElement.attributes.getNamedItem("role")) === null || _a === void 0 ? void 0 : _a.value) === "button") {
                // emoji selector for comment boxes
                newSpan.style.fontSize = "26px";
                newSpan.style.lineHeight = "28px";
                newSpan.className = "_5zft";
            }
            else if (((_c = (_b = el.parentElement.parentElement) === null || _b === void 0 ? void 0 : _b.attributes.getNamedItem("role")) === null || _c === void 0 ? void 0 : _c.value) === "menuitem") {
                // emoji selector in messenger
                newSpan.style.fontSize = "32px";
                newSpan.style.lineHeight = "30px";
                newSpan.style.textAlign = "center";
            }
            else {
                // emojis in comment text and 'create post' pop-up
                newSpan.style.fontSize = "26px";
                newSpan.style.lineHeight = "26px";
                el.parentElement.className = "";
            }
            el.alt = "";
            el.style.display = "none";
            el.parentElement.appendChild(newSpan);
        }
    }
}
function modifyReactionEmojis() {
    emojis_1.reactionItems.forEach((i) => {
        let existingIcons = document.querySelectorAll(`img[src="${i.svg}"]`);
        existingIcons.forEach((el) => {
            var _a, _b;
            if (el.parentElement) {
                let newSpan = document.createElement("span");
                newSpan.innerText = i.icon;
                if (((_b = (_a = el.parentElement.parentElement) === null || _a === void 0 ? void 0 : _a.attributes.getNamedItem("role")) === null || _b === void 0 ? void 0 : _b.value) === "menuitem") {
                    newSpan.style.fontSize = "32px";
                    newSpan.style.lineHeight = "30px";
                    newSpan.style.textAlign = "center";
                }
                else {
                    newSpan.style.fontSize = el.parentElement.style.height;
                    newSpan.style.lineHeight = el.parentElement.style.height;
                }
                el.parentElement.appendChild(newSpan);
                // Hide element and remove src so it won't be found in the next loop
                // (cannot use el.remove because that seems to delete some visible elements. Too lazy to figure out now)
                el.style.display = "none";
                el.src = "";
            }
        });
    });
}
setInterval(() => {
    emojis_1.emojisList.forEach(modifySpanEmojis);
    emojis_1.emojisList.forEach(modifyImageEmojis);
    modifyReactionEmojis();
}, 1000);
