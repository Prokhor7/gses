const cron = require("node-cron");
const { sendEmails } = require("../services/emailService");
const { getUsdRate } = require("../services/currencyService");

module.exports = () => {
  cron.schedule(
    "0 8 * * *",
    async () => {
      try {
        const currencyRate = await getUsdRate();
        await sendEmails(currencyRate);
        console.log("Emails sent successfully.");
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    },
    {
      timezone: "Europe/Kiev",
    }
  );
};
