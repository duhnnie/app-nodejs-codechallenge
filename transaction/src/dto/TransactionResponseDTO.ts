import Transaction from "../models/Transaction"
import GenericResponseDTO from "./GenericResponseDTO"

interface TransactionResponseDTOData {
  transactionExternalId: string
  transactionType: number
  transactionStatus: string
  value: number
  createdAt: string
}

export default class TransactionResponseDTO {

  public readonly transactionExternalId: string
  public readonly transactionType: GenericResponseDTO
  public readonly transactionStatus: GenericResponseDTO
  public readonly value: number
  public readonly createdAt: string

  public static fromTransaction(transaction: Transaction): TransactionResponseDTO {
    return new TransactionResponseDTO({
      transactionExternalId: transaction.id,
      transactionType: transaction.type,
      transactionStatus: transaction.status,
      value: transaction.value,
      createdAt: transaction.createdAt?.toISOString() ?? ""
    })
  }

  constructor(data: TransactionResponseDTOData) {
    this.transactionExternalId = data.transactionExternalId
    this.transactionType = new GenericResponseDTO(String(data.transactionType))
    this.transactionStatus = new GenericResponseDTO(data.transactionStatus)
    this.value = data.value
    this.createdAt = data.createdAt
  }

}