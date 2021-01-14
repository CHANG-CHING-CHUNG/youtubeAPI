const cron = require("node-cron");
const { runAsyncTasks } = require("./tasks");

console.log("每天23:10定時抓 Youtube 電影預告排程已啟動...");
runAsyncTasks().then(() => console.log("抓 Youtube 電影預告結束"));
// cron.schedule("10 23 * * *", async () => {
//   console.log("抓 Youtube 電影預告開始");

// });
