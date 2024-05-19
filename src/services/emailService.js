const nodemailer = require("nodemailer");
const { getAll } = require("./subscribeService");

const sendEmail = async (subscriberEmail, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: subscriberEmail,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmails = async (currencyRate) => {
    const text = `The latest currency rate for ${currencyRate.ccy}/${currencyRate.base_ccy} is: BUY - ${currencyRate.buy}| SALE - ${currencyRate.sale}!`;
    try {
        const subscribers = await getAll();
        subscribers.forEach(async (subscriber) => {
          await sendEmail(subscriber.email, "Updated Currency Rate", text);
        });
      } catch (error) {
        console.error("Error sending emails to subscribers:", error);
      }
};

module.exports = { sendEmails, sendEmail };
