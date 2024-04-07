import Transaction from "../models/Transaction";

export default interface ITransactionUseCase {

  create(transaction: Transaction): Promise<Transaction>
  get(id: Transaction['id']): Promise<Transaction | null>
  approve(id: Transaction['id']): Promise<void>
  reject(id: Transaction['id']): Promise<void>

}