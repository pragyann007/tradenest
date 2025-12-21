import mongoose from "mongoose";
import { Candle } from "./models/Candle.model.js";
import { Asset } from "./models/Assets.model.js";

mongoose.connect("mongodb+srv://pragyanthapaliya027_db_user:FutIOss3WYwYHlRB@trade.yrofub3.mongodb.net/?",)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
// 2. Dummy Assets
const assets = [
  { symbol: "AAPL", name: "Apple Inc", type: "STOCK", isActive: true },
  { symbol: "GOOGL", name: "Google", type: "STOCK", isActive: true },
  { symbol: "TSLA", name: "Tesla", type: "STOCK", isActive: true },
  { symbol: "BTC", name: "Bitcoin", type: "CRYPTO", isActive: true },
  { symbol: "ETH", name: "Ethereum", type: "CRYPTO", isActive: true }
];

// 3. Seed Assets
const seedAssets = async () => {
  await Asset.deleteMany({});
  const savedAssets = await Asset.insertMany(assets);
  console.log("Assets seeded ✅");
  return savedAssets;
};

// 4. Dummy Candles generator
const generateCandles = (assetId, startPrice, numCandles = 50) => {
  const candles = [];
  let lastClose = startPrice;
  let currentTime = new Date();

  for (let i = 0; i < numCandles; i++) {
    const open = lastClose;
    const change = (Math.random() - 0.5) * 2; // random -1 to +1
    const close = +(open + change).toFixed(2);
    const high = Math.max(open, close) + +(Math.random()).toFixed(2);
    const low = Math.min(open, close) - +(Math.random()).toFixed(2);
    const volume = Math.floor(Math.random() * 1000) + 100;

    candles.push({
      assetId,
      interval: "1m",
      open,
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close,
      volume,
      timestamp: new Date(currentTime.getTime() - (numCandles - i) * 60 * 1000)
    });

    lastClose = close;
  }

  return candles;
};

// 5. Seed Candles
const seedCandles = async (savedAssets) => {
  await Candle.deleteMany({});

  for (const asset of savedAssets) {
    const startPrice = Math.floor(Math.random() * 100) + 50; // start 50-150
    const candles = generateCandles(asset._id, startPrice);
    await Candle.insertMany(candles);
    console.log(`Candles seeded for ${asset.symbol} ✅`);
  }
};

// 6. Run all
const seedAll = async () => {
  try {
    const savedAssets = await seedAssets();
    await seedCandles(savedAssets);
    console.log("All dummy data seeded ✅");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

seedAll();
