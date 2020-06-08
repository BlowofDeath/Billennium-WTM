import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs/typeDefs";
import resolvers from "./resolvers/resolvers";
import db from "./configs/database";
import { verifyJWT } from "./middleware/jwtTool";
import express from "express";
const app = express();

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
  app.use(express.static(process.env.FRONTEND_FILES || "../client/build"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    //This makes that error display only message
    // formatError: (err) => {
    //   return err.message;
    // },
    context: ({ req }) => {
      let auth = null;
      try {
        if (req.headers.authorization) {
          const jwt = verifyJWT(req.headers.authorization);
          auth = jwt || null;
        }
      } catch (err) {}
      if (auth != null && !auth.userId) throw new Error("Incorrect token");
      return {
        auth,
      };
    },
  });

  server.applyMiddleware({ app });
  const port = process.env.PORT || 4001;
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer();
