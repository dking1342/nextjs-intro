import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Post {
    id: ID
    userId: Int
    title: String
    body: String
  }

  type Query {
    getPosts: [Post]
    getPost(id:ID!): Post
  }
`