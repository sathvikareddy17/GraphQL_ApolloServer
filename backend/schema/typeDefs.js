const { gql } = require('apollo-server-express');

module.exports = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }
  type Query {
    items: [Item]
  }
  type Mutation {
    addItem(name: String!, description: String!): Item
  }
`;