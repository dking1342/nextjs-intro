import { Scalars } from "../generated/graphql";

type GetPostArgs = {
  id: Scalars["ID"]
}

export const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        return data
      } catch (error) {
        return {
          error
        }
      }
    },
    getPost: async (_:undefined,args:GetPostArgs) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${args.id}`);
        const data = await response.json();
        return data
      } catch (error) {
        return { error }
      }
    }
  }
}