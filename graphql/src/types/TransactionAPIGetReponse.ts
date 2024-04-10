type TransactionGetResponse = {
  id: string
  accountDebitId: string
  accountCreditId: string
  type: number
  value: number
  status: string
  createdAt: string
}

export default TransactionGetResponse
