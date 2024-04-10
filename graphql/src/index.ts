import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import TransactionAPI from "./datasources/TransactionAPI"
import { readFileSync } from "fs"
import resolvers from './resolvers'
import path from "path"
import ContextType from "./types/ContextType"

const schemaPath = path.resolve(__dirname, "./graphql/schema.graphql")
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })

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
  }
}).then(({ url }) => {
  console.log(`GraphQL server running at ${url}`)
})