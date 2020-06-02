import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs/typeDefs";
import resolvers from "./resolvers/resolvers";
import db from "./configs/database";
import { verifyJWT } from "./middleware/jwtTool";

async function startServer() {
  await db
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  //This makes that tables are dropped and created on server restart
  // await db.sync({ force: true }).then(() => {
  //   console.log(`Database & tables created!`);
  // });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    //This makes that error display only message
    // formatError: (err) => {
    //   return err.message;
    // },
    context: ({ req }) => {
      const auth = req.headers.authorization
        ? verifyJWT(req.headers.authorization)
        : null;
      if (auth != null && !auth.userId) throw new Error("Incorrect token");
      return {
        auth,
      };
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer();
