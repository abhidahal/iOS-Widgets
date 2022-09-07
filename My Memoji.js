// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: user-alt;
let widget = new ListWidget();
const p = 25;
widget.setPadding(p, p, p, p);

const imageName = "Memoji.png";
const filePath = getImagePath(imageName);
const img = await Image.fromFile(filePath);
addImage(img);

function getImagePath(imgName) {
  const scriptableFilePath =
    "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/";
  const backgroundImageURL = scriptableFilePath + imgName;
  return backgroundImageURL;
}

function addImage(image) {
  const imageStack = widget.addStack();
  const imageNode = imageStack.addImage(image);
  imageNode.centerAlignImage();
}

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
