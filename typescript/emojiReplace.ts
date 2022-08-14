import { emojisList, IEmoji, reactionItems } from "./emojis";

function modifySpanEmojis(emoji: IEmoji) {
  //Modify span elements to show original emoji
  //instead of the shite FB <img> they force over it.
  // let spanEls = document.body.getElementsByTagName("span");
  let spanEls = document.querySelectorAll(`span[style*="${emoji.emojiCode}"]`);
  for (let i = 0; i < spanEls.length; i++) {
    let el = spanEls[i] as HTMLSpanElement;
    if (el.style.backgroundImage.indexOf(emoji.emojiCode) > -1) {
      el.style.backgroundImage = "none";
      el.style.color = "initial";
    }
  }
}

function modifyImageEmojis(emoji: IEmoji) {
  //Some FB emojis exist purely as images.
  //Delete them and replace with a <span> containing only unicode

  let imgEls = document.querySelectorAll(`img[alt="${emoji.emojiIcon}"]`);

  for (let i = 0; i < imgEls.length; i++) {
    let el = imgEls[i] as HTMLImageElement;
    if (el.parentElement) {
      let newSpan = document.createElement("span");
      newSpan.innerText = emoji.emojiIcon;

      if (
        el.parentElement.attributes.getNamedItem("role")?.value === "button"
      ) {
        // emoji selector for comment boxes
        newSpan.style.fontSize = "26px";
        newSpan.style.lineHeight = "28px";
        newSpan.className = "_5zft";
      } else if (
        el.parentElement.parentElement?.attributes.getNamedItem("role")
        ?.value === "menuitem"
        ) {
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
  reactionItems.forEach((i) => {
    let existingIcons = document.querySelectorAll(`img[src="${i.svg}"]`);
    existingIcons.forEach((el) => {
      if (el.parentElement) {
        let newSpan = document.createElement("span");
        newSpan.innerText = i.icon;

        if (
          el.parentElement.parentElement?.attributes.getNamedItem("role")
            ?.value === "menuitem"
        ) {
          newSpan.style.fontSize = "32px";
          newSpan.style.lineHeight = "30px";
          newSpan.style.textAlign = "center";
        } else {
          newSpan.style.fontSize = el.parentElement.style.height;
          newSpan.style.lineHeight = el.parentElement.style.height;
        }
        el.parentElement.appendChild(newSpan);
        // Hide element and remove src so it won't be found in the next loop
        // (cannot use el.remove because that seems to delete some visible elements. Too lazy to figure out now)
        (el as HTMLIFrameElement).style.display = "none";
        (el as HTMLIFrameElement).src = "";
      }
    });
  });
}

setInterval(() => {
  emojisList.forEach(modifySpanEmojis);
  emojisList.forEach(modifyImageEmojis);
  modifyReactionEmojis();
}, 1000);
