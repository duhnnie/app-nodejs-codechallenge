import Transaction from "../models/Transaction";

export default interface ITransactionRepository {

  create(data: Transaction): Promise<Transaction>

}
