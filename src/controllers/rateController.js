const { getUsdRate } = require("../services/currencyService");

const getRate = async (req, res) => {
  try {
    const rate = await getUsdRate();
    res.send(rate.buy);
  } catch (error) {
    res.status(400).send("Invalid status value");
  }
};

module.exports = { getRate };
