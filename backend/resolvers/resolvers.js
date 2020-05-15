import User from "../models/User";

const resolvers = {
  Query: {
    users: async () => {
      const user = await User.findAll();
      console.log(user);
      return user;
    },
  },
  Mutation: {
    user: (parent, { role, email, password, first_name, last_name }) => {
      const user = User.create({
        role,
        email,
        password,
        first_name,
        last_name,
      });

      return user;
    },
  },
};

export default resolvers;
