// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: grin-tears;
const url = `https://meme-api.herokuapp.com/gimme`;
const req = new Request(url);
const res = await req.loadJSON();
const memeUrl = res.url;
const i = new Request(memeUrl);
const img = await i.loadImage();

let widget = createWidget(img);
if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentLarge();
}

function createWidget(img) {
  let w = new ListWidget();
  w.backgroundColor = new Color("#1A1A1A");
  w.addSpacer(1);
  let image = w.addImage(img);
  image.centerAlignImage();
  w.addSpacer(1);
  w.setPadding(0, 0, 0, 0);
  return w;
}
