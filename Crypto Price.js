// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: dollar-sign;
const params = args.widgetParameter ? args.widgetParameter.split(",") : [];

const isDarkTheme = params?.[0] === "dark";
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
  widget.backgroundColor = new Color("#1C1C1E");
}
widget.setPadding(padding, padding, padding, padding);

widget.url = "https://b5s.dabhishek.com.np/";

const headerStack = widget.addStack();
headerStack.setPadding(0, 0, 25, 0);
const headerText = headerStack.addText("Crypto price");
headerText.font = Font.mediumSystemFont(16);
if (isDarkTheme) {
  headerText.textColor = new Color("#FFFFFF");
}

async function buildWidget() {
  const solanaImage = await loadImage(
    "https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422"
  );
  const ethereumImage = await loadImage(
    "https://rubic.exchange/assets/images/widget/ethereum.png"
  );

  const solanaPriceInfo = await getTokenPriceInfo("solana");
  const ethereumPriceInfo = await getTokenPriceInfo("ethereum");

  const roundedSolanaPrice = Math.round(solanaPriceInfo.price * 1000) / 1000;
  const roundedEthereumPrice = Math.round(ethereumPriceInfo.price);

  addCrypto(solanaImage, "SOL", `$${roundedSolanaPrice}`, solanaPriceInfo.grow);
  addCrypto(
    ethereumImage,
    "ETH",
    `$${roundedEthereumPrice}`,
    ethereumPriceInfo.grow
  );
}

function addCrypto(image, symbol, price, grow) {
  const rowStack = widget.addStack();
  rowStack.setPadding(0, 0, 20, 0);
  rowStack.layoutHorizontally();

  const imageStack = rowStack.addStack();
  const symbolStack = rowStack.addStack();
  const priceStack = rowStack.addStack();

  imageStack.setPadding(0, 0, 0, 10);
  symbolStack.setPadding(0, 0, 0, 8);

  const imageNode = imageStack.addImage(image);
  imageNode.imageSize = new Size(20, 20);
  imageNode.leftAlignImage();

  const symbolText = symbolStack.addText(symbol);
  symbolText.font = Font.mediumSystemFont(16);

  const priceText = priceStack.addText(price);
  priceText.font = Font.mediumSystemFont(16);

  if (isDarkTheme) {
    symbolText.textColor = new Color("#FFFFFF");
  }

  if (grow) {
    priceText.textColor = new Color("#4AA956");
  } else {
    priceText.textColor = new Color("#D22E2E");
  }
}

async function getTokenPriceInfo(tokenId) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenId}`;
  const req = new Request(url);
  const apiResult = await req.loadJSON();
  return {
    price: apiResult[0].current_price,
    grow: apiResult[0].price_change_24h > 0,
  };
}

async function loadImage(imgUrl) {
  const req = new Request(imgUrl);
  return await req.loadImage();
}

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
