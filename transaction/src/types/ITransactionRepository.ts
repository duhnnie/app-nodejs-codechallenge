import Transaction from "../models/Transaction";

export default interface ITransactionRepository {

  create(transaction: Transaction): Promise<Transaction>
  findOne(id: string): Promise<Transaction | null>

}
