import { GraphQLFieldResolver, GraphQLTypeResolver } from "graphql";
// import { TransactionResolvers, TransactionStatus } from "../generated/graphql";
// import { TransactionResolvers, TransactionStatus } from "../generated/graphql";
import ContextType from "../types/ContextType";
import TransactionGetResponse from "../types/TransactionAPIGetReponse";
import { Transaction } from "../generated/graphql";
import TransactionTypeAPIGetResponse from "../types/TransactionTypeAPIGetResponse";

const transactionExternalId: GraphQLFieldResolver<
  TransactionGetResponse,
  ContextType
> = async (parent, _, { dataSources }) => {
  return parent.id
}

const transactionType: GraphQLFieldResolver<
  TransactionGetResponse,
  ContextType
>= async (parent, _, { dataSources }) => {
  const { type: transactionTypeId } = parent
  const transactionType = await dataSources.transactionAPI.getTransactionType(transactionTypeId)

  return { ...transactionType }
}

const transactionStatus:  GraphQLFieldResolver<
TransactionGetResponse,
ContextType
>= async (parent, _, { dataSources }) => {
  return {
    name: parent.status
  }
}

const resolver = {
  transactionExternalId,
  transactionType,
  transactionStatus
}

export default resolver