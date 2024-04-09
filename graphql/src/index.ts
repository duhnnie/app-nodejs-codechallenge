import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import TransactionAPI from "./datasources/TransactionAPI"
import { readFileSync } from "fs"
import resolvers from './resolvers'
import path from "path"
import ContextType from "./types/ContextType"

const schemaPath = path.resolve(__dirname, "./graphql/schema.graphql")
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })
// const datasource = new TransactionAPI()

// datasource.getTransaction("002683c2-fbfe-4d90-9b3e-b157e6f0d3fb")
//   .then((transaction) => {
//     console.log(`status: ${transaction.transactionStatus.name} value: ${transaction.value}`)
//   })
//   .catch((error) => console.log(error))

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