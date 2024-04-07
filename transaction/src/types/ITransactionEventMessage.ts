import TransactionStatus from "./TransactionStatus"

interface ITransactionEventMessage {
  guid: string
  debitAccountId: string
  value: number
  status: TransactionStatus
}

export default ITransactionEventMessage
