import TransactionStatus from "./TransactionStatus"

type Transaction = {
  guid: string
  debitAccountId: string
  value: number
  status: TransactionStatus
}

export default Transaction
