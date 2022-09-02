// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: users;

const array = args.widgetParameter;
var param = JSON.parse("[" + array + "]");

const user = param[2];
const reddit = param[0];
const telegram = param[1];
const github = param[2];
const twitter = param[3];

const data = await fetchData();
const widget = createWidget(data);

Script.setWidget(widget);
Script.complete();

function createWidget(data) {
  const w = new ListWidget();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
  bgColor.locations = [0.0, 1.0];
  w.backgroundGradient = bgColor;
  w.setPadding(12, 15, 15, 12);
  w.spacing = 6;

  const time = new Date();
  const dfTime = new DateFormatter();
  dfTime.locale = "en";
  dfTime.useMediumDateStyle();
  dfTime.useNoTimeStyle();

  const firstLine = w.addText(`[] ${user} ~$ now`);
  firstLine.textColor = Color.white();
  firstLine.textOpacity = 0.7;
  firstLine.font = new Font("Menlo", 10);

  const batteryLine = w.addText(`[🔋] ${renderBattery()}`);
  batteryLine.textColor = new Color("#6ef2ae");
  batteryLine.font = new Font("Menlo", 10);

  const timeLine = w.addText(`[🗓] ${dfTime.string(time)}`);
  timeLine.textColor = Color.white();
  timeLine.font = new Font("Menlo", 11);

  const githubLine = w.addText(`[📟] GitHub: ${data.github}`);
  githubLine.textColor = new Color("#ff9468");
  githubLine.font = new Font("Menlo", 11);

  const redditLine = w.addText(`[🤖] Reddit: ${data.reddit}`);
  redditLine.textColor = new Color("#ffcc66");
  redditLine.font = new Font("Menlo", 11);

  const twitterLine = w.addText(`[🐦] Twitter: ${data.twitter}`);
  twitterLine.textColor = new Color("#ffa7d3");
  twitterLine.font = new Font("Menlo", 11);

  const telegramLine = w.addText(`[️️🪁] Telegram: ${data.telegram}`);
  telegramLine.textColor = new Color("#7dbbae");
  telegramLine.font = new Font("Menlo", 11);

  return w;
}

async function fetchData() {
  const url =
    `https://api.spencerwoo.com/substats/?source=reddit&queryKey=${reddit}` +
    `&source=telegram&queryKey=${telegram}` +
    `&source=github&queryKey=${github}` +
    `&source=twitter&queryKey=${twitter}`;
  const request = new Request(url);
  const res = await request.loadJSON();
  return res.data.subsInEachSource;
}

function renderBattery() {
  const batteryLevel = Device.batteryLevel();
  const juice = "#".repeat(Math.floor(batteryLevel * 8));
  const used = ".".repeat(8 - juice.length);
  const batteryAscii = `[${juice}${used}] ${Math.round(batteryLevel * 100)}%`;
  return batteryAscii;
}
