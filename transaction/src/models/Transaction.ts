import { v4 as uuidV4 } from 'uuid'
import TransactionStatus from "../types/TransactionStatus"

export default class Transaction {

  public readonly id: string
  public readonly accountDebitId: string
  public readonly accountCreditId: string
  public readonly type: number
  public readonly status: TransactionStatus
  public readonly value: number
  public readonly createdAt: Date | null

  constructor(
    id :string = uuidV4(),
    accountDebitId: string,
    accountCreditId: string,
    type: number,
    value: number,
    status: TransactionStatus,
    createdAt: Date | null = null
  ) {
    this.type = type
    this.accountDebitId = accountDebitId
    this.accountCreditId = accountCreditId
    this.value = value
    this.status = status
    this.id = id
    this.createdAt = createdAt
  }
}
