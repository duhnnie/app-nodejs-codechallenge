import Transaction from "../models/Transaction";
import TransactionType from "../models/TransactionType";
import TransactionStatus from "./TransactionStatus";

export default interface ITransactionRepository {

  create(transaction: Transaction): Promise<Transaction>
  findOne(id: string): Promise<Transaction | null>
  updateStatus(id: string, status: TransactionStatus): Promise<void>
  findOneType(id: number): Promise<TransactionType | null>

}
