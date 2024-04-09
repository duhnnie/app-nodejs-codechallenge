import TransactionAPI from "../datasources/TransactionAPI"

interface ContextType {
  dataSources: {
    transactionAPI: TransactionAPI
  }
}

export default ContextType
