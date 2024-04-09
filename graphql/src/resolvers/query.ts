import { QueryTransactionByIdArgs, QueryTransactionTypesArgs, Transaction, TransactionStatus } from "../generated/graphql";
import ContextType from "../types/ContextType";

const query = {
  TransactionById: async (_: any, args: QueryTransactionByIdArgs, { dataSources }: ContextType) => {
    const { id } = args
    const { transactionAPI } = dataSources
    const response = await transactionAPI.getTransaction(id)

    return Promise.resolve(response)
  },
  TransactionTypes: async(_: any, args: QueryTransactionTypesArgs, { dataSources }: ContextType) => {
    const { offset, limit } = args
    const { transactionAPI } = dataSources
    const response = await transactionAPI.getTransactionTypes(offset, limit)

    return response
  }
}

export default query