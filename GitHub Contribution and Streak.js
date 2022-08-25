// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: code-branch;
const userName = args.widgetParameter;
const isDarkTheme = Device.isUsingDarkAppearance();
const widget = new ListWidget();
if (isDarkTheme) {
  widget.backgroundColor = new Color("#000000");
}
widget.setPadding(0, 0, 0, 0);
widget.url = "https://github.com/abhidahal";
const headerStack = widget.addStack();
headerStack.setPadding(10, 120, 0, 0);
const headerText = headerStack.addText(`u/${userName}`);
headerText.font = Font.mediumSystemFont(16);
if (isDarkTheme) {
  headerText.textColor = new Color("#FFFFFF");
}

async function buildWidget() {
  const theme = isDarkTheme ? "highcontrast" : "default";
  const url = `https://github-readme-streak-stats.herokuapp.com/?user=${userName}&theme=${theme}&hide_border=true&date_format=j%20M%5B%20Y%5D&type=png`;
  const gitStatusImage = await loadImage(url);
  addStatus(gitStatusImage);
}

function addStatus(image) {
  const rowStack = widget.addStack();
  const imageStack = rowStack.addStack();
  const imageNode = imageStack.addImage(image);
  imageNode.centerAlignImage();
}

async function loadImage(imgUrl) {
  const req = new Request(imgUrl);
  return await req.loadImage();
}

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentMedium();
