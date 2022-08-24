// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;
const params = args.widgetParameter ? args.widgetParameter.split(",") : [];
const widget = new ListWidget();
widget.backgroundColor = new Color("#1C1C1E");
let gradient = new LinearGradient();
gradient.locations = [0, 1];
gradient.colors = [new Color("000046"), new Color("1CB5E0")];
widget.backgroundGradient = gradient;

widget.setPadding(2, 2, 2, 2);
widget.url = "https://b5s.dabhishek.com.np";

const flagImage = await loadImage("https://flagcdn.com/w40/np.png");
const headerStack = widget.addStack();
headerStack.setPadding(0, 0, 25, 0);
headerStack.layoutHorizontally();

const imageStack = headerStack.addStack();
imageStack.setPadding(0, 0, 0, 10);

const imageNode = imageStack.addImage(flagImage);
imageNode.imageSize = new Size(20, 20);
imageNode.leftAlignImage();

const headerText = headerStack.addText("Nepali Date");
headerText.font = Font.mediumSystemFont(16);

headerText.textColor = new Color("#FFFFFF");
async function buildWidget() {
  const date = await getDate();
  addDate(date);
}

function addDate(date) {
  const rowStack = widget.addStack();
  rowStack.setPadding(0, 0, 20, 0);
  rowStack.layoutHorizontally();
  const dateStack = rowStack.addStack();
  dateStack.setPadding(0, 0, 0, 8);
  const dateText = dateStack.addText(date);
  dateText.font = Font.mediumSystemFont(16);
  dateText.textColor = new Color("#FFFFFF");
}

async function getDate() {
  const url =
    "https://nepali-datetime.herokuapp.com/date?format=%25d-%25B-%25y";
  const req = new Request(url);
  const apiResult = await req.loadJSON();
  return apiResult.data;
}

async function loadImage(imgUrl) {
  const req = new Request(imgUrl);
  return await req.loadImage();
}

await buildWidget();
Script.setWidget(widget);
Script.complete();
widget.presentSmall();
