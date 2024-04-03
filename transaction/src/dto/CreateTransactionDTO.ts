import { IsInt, Min, IsNotEmpty, IsEnum, Matches } from 'class-validator'
import Transaction from '../models/Transaction'

interface TransactionCreationDTOData {
  accountExternalIdDebit: string
  accountExternalIdCredit: string
  transferTypeId: number
  value: number
}

export default class TransactionCreationDTO {
  @IsNotEmpty()
  public readonly accountExternalIdDebit: string

  @IsNotEmpty()
  public readonly accountExternalIdCredit: string

  @IsInt()
  public readonly transferTypeId: number

  @Min(0.01)
  public readonly value: number

  public static toTransaction(payload: TransactionCreationDTO) {
    return new Transaction(
      undefined,
      payload.accountExternalIdDebit,
      payload.accountExternalIdCredit,
      payload.transferTypeId,
      payload.value
    )
  }

  constructor(data: TransactionCreationDTOData) {
    this.accountExternalIdCredit = data.accountExternalIdCredit
    this.accountExternalIdDebit = data.accountExternalIdDebit
    this.transferTypeId = data.transferTypeId
    this.value = data.value
  }
}
