import { MutationCreateTransactionArgs } from "../generated/graphql"
import ContextType from "../types/ContextType"

const mutation = {
  createTransaction: async (root: any, args: MutationCreateTransactionArgs, { dataSources }: ContextType) => {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value
    } = args.input

    return await dataSources.transactionAPI.createTransaction(
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value
    )
  }
}

export default mutation