require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/swagger.yml");
const { getUsdRate } = require("./services/currencyService");
const rateRoute = require("./routes/rateRoute");
const subscribeRoute = require("./routes/subscribeRoute");
const sequelize = require("./db/db");
const mailJob = require("./cron/mailJob");
// const { sendEmail } = require("./services/emailService");

mailJob();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
//  sendEmail("oleksandr.prokhorenko1@gmail.com", "Hi", "test");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(rateRoute);
app.use(subscribeRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).send(message);
});

const PORT = 3000;

sequelize.sync().then((result) => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
