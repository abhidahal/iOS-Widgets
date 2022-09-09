// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: grin-tears;
const url = `https://meme-api.herokuapp.com/gimme`;
const req = new Request(url);
const res = await req.loadJSON();
const source = res.postLink;
const memeUrl = res.url;
const i = new Request(memeUrl);
const img = await i.loadImage();
const widget = createWidget(img);
widget.url = source;
if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentLarge();
}

function createWidget(img) {
  const w = new ListWidget();
  w.addSpacer(1);
  const headerStack = w.addStack();
  headerStack.setPadding(0, 30, 10, 0);
  const headerText = headerStack.addText(res.title);
  headerText.font = Font.mediumSystemFont(16);
  headerText.centerAlignText();
  let image = w.addImage(img);
  image.centerAlignImage();
  w.addSpacer(1);
  w.setPadding(0, 0, 0, 0);
  return w;
}
