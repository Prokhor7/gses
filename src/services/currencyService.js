const currencyApi = require("../api/currency_rate");

const getUsdRate = async () => {
  try {
    const response = await currencyApi.get();
    return response.data.find((rate) => rate.ccy === "USD");
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};

module.exports = { getUsdRate };
