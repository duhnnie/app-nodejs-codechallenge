import Transaction from "../models/Transaction";
import TransactionType from "../models/TransactionType";

export default interface ITransactionUseCase {

  create(transaction: Transaction): Promise<Transaction>
  getById(id: Transaction['id']): Promise<Transaction | null>
  approve(id: Transaction['id']): Promise<void>
  reject(id: Transaction['id']): Promise<void>
  getTypeById(id: Required<TransactionType['id']>): Promise<TransactionType | null>
  getTypes(): Promise<TransactionType[]>

}