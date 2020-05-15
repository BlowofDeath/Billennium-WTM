import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs/typeDefs";
import resolvers from "./resolvers/resolvers";
import db from "./configs/database";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
async function startServer() {
  await db
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  await db.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);
  });
  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

startServer();
