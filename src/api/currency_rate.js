const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5",
});
