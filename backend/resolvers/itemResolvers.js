const Item = require('../models/Item');

module.exports = {
  Query: {
    items: async () => await Item.find(),
    getItem: async (_, { id }) => await Item.findById(id)  
  },
  Mutation: {
    addItem: async (_, { name, description }) => {
      const newItem = new Item({ name, description });
      await newItem.save();
      return newItem;
    },
    deleteItem: async (_, { id }) => {
      const deletedItem = await Item.findByIdAndDelete(id);
      return deletedItem;
    },
    updateItem: async (_, { id, name, description }) => {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      return updatedItem;
    }
  }
};
