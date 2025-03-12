
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    items: [Item]
    getItem(id: ID!): Item  # ✅ Add this line to match resolvers
  }

  type Mutation {
    addItem(name: String!, description: String!): Item
    deleteItem(id: ID!): Item  # ✅ Add delete mutation
    updateItem(id: ID!, name: String, description: String): Item  # ✅ Add update mutation
  }
`;
