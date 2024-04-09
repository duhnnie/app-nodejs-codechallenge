import { IsInt, Min, IsUUID } from 'class-validator'
import Transaction from '../models/Transaction'
import TransactionStatus from '../types/TransactionStatus'

interface TransactionCreationDTOData {
  accountDebitId: string
  accountCreditId: string
  type: number
  value: number
}

export default class TransactionCreationDTO {
  @IsUUID()
  public readonly accountDebitId: string

  @IsUUID()
  public readonly accountCreditId: string

  @IsInt()
  public readonly type: number

  @Min(0.01)
  public readonly value: number

  public toTransaction() {
    return new Transaction(
      undefined,
      this.accountDebitId,
      this.accountCreditId,
      this.type,
      this.value,
      TransactionStatus.Pending
    )
  }

  constructor(data: TransactionCreationDTOData) {
    this.accountCreditId = data.accountCreditId
    this.accountDebitId = data.accountDebitId
    this.type = data.type
    this.value = data.value
  }
}
