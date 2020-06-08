import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import User from "./models/User";
import typeDefs from "./typeDefs/typeDefs";
import resolvers from "./resolvers/resolvers";
import bcrypt from "bcrypt";
import db from "./configs/database";
import { verifyJWT } from "./middleware/jwtTool";
import express from "express";
import path from "path";
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
  //This create or alter table
  await db.sync({ alter: true }).then(async () => {
    const exist = await User.findOne();
    const password = process.env.ADMIN_PASSWORD || "12345678";
    const hash = bcrypt.hashSync(password, 10);
    if (!exist) {
      const user = await User.create({
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        role: "Admin",
        password: hash,
        first_name: "admin",
        last_name: "admin",
        isActive: true,
      });
      console.log("\nFirst user account \n");
      console.log(`email: ${user.email}`);
      console.log(`password: ${password} \n`);
    }
  });

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

  if (process.env.NODE_ENV === "production") {
    app.use(
      express.static(
        path.join(
          __dirname,
          process.env.FRONTEND_FILES || "/../../client/build"
        )
      )
    );
    app.get("*", (request, response) => {
      response.sendFile(
        path.join(
          __dirname,
          process.env.FRONTEND_FILES || "/../../client/build",
          "index.html"
        )
      );
    });
  } else {
    app.use(express.static(process.env.FRONTEND_FILES || "../client/build"));
  }

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4001;
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer();
