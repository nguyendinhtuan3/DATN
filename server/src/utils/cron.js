const cron = require("node-cron");
const { markWiltedWords } = require("./autoWilted");

cron.schedule("0 0 * * *", async () => {
  console.log("[CRON] Đang kiểm tra từ vựng bị héo...");
  await markWiltedWords();
});
