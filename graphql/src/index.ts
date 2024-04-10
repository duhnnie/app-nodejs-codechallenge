import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import TransactionAPI from "./datasources/TransactionAPI"
import { readFileSync } from "fs"
import resolvers from './resolvers'
import path from "path"
import ContextType from "./types/ContextType"

const schemaPath = path.resolve(__dirname, "./graphql/schema.graphql")
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })
const port = Number(process.env.YAPE_GRAPHQL_PORT) ?? 4000

const server = new ApolloServer<ContextType>({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  context: async() => {
    const { cache } = server

    return {
      dataSources: {
        transactionAPI: new TransactionAPI({ cache })
      }
    }
  },
  listen: { port }
}).then(({ url }) => {
  console.log(`GraphQL server running at ${url}`)
})