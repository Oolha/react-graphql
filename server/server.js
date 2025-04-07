import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: 28, isMarried: true },
  { id: "2", name: "Jane Smith", age: 32, isMarried: false },
  { id: "3", name: "Michael Johnson", age: 45, isMarried: true },
  { id: "4", name: "Emily Williams", age: 24, isMarried: false },
  { id: "5", name: "Robert Brown", age: 38, isMarried: true },
  { id: "6", name: "Sarah Davis", age: 29, isMarried: false },
  { id: "7", name: "David Miller", age: 52, isMarried: true },
];

const typeDefs = `
type Query {
getUsers: [User]
getUserById(id: ID!): User
}
type Mutation {
createUser(name: String!, age: Int!, isMarried: Boolean!): User
}
type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
}
`;
const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server Running at: ${url}`);
