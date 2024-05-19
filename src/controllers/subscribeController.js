const { createSubscriber } = require("../services/subscribeService");

const addSubscriber = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await createSubscriber(email);

    if (!result.success) {
      return res.status(409).send(result.message);
    }

    return res.send("Subscriber added");
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { addSubscriber };
