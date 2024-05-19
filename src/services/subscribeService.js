const Subscriber = require("../models/subscriber");

const getAll = () => {
  return Subscriber.findAll();
};

const getByEmail = (email) => {
  return Subscriber.findOne({ where: { email } });
};

const createSubscriber = async (email) => {
  try {
    const existingSubscriber = await getByEmail(email);
    if (existingSubscriber) {
      return {
        success: false,
        message: "Subscriber with this email already exists",
      };
    }
    const newSubscriber = await Subscriber.create({ email });
    return { success: true, subscriber: newSubscriber };
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, getByEmail, createSubscriber };
