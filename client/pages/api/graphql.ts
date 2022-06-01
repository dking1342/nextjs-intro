import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginInlineTrace, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs } from "../../src/schema";
import { resolvers } from "../../src/resolvers";
// import { buildSchema } from "type-graphql";

// const schema = await buildSchema({})

const apolloServer = new ApolloServer({ 
  // schema,
  typeDefs, 
  resolvers,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginInlineTrace(),
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}


export const config = {
  api: {
    bodyParser: false,
  },
}