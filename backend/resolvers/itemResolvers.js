const Item = require('../models/Item');

module.exports = {
  Query: {
    items: async () => await Item.find()
  },
  Mutation: {
    addItem: async (_, { name, description }) => {
      const newItem = new Item({ name, description });
      await newItem.save();
      return newItem;
    }
  }
};