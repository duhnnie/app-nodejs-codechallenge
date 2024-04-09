type TransactionGetResponse = {
  // transactionExternalId: string
  // transactionType: { name: string }
  // transactionStatus: { name: string }
  // value: number
  // createdAt: string

  id: string
  accountDebitId: string
  accountCreditId: string
  type: number
  value: number
  status: string
  createdAt: string
}

export default TransactionGetResponse
