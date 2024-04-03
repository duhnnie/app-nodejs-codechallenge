import Transaction from "../models/Transaction";
import ITransactionRepository from "../types/ITransactionRepository";

export default class TransactionRepository implements ITransactionRepository {

  create(data: Transaction): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }

}
