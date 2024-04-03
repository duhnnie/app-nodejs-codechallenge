import { PrismaClient } from "@prisma/client";
import Transaction from "../models/Transaction";
import ITransactionRepository from "../types/ITransactionRepository";

export default class TransactionRepository implements ITransactionRepository {

  // TODO: move this upper, so we have a unique database connection.
  private _db: PrismaClient

  constructor() {
    this._db = new PrismaClient()
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const res = await this._db.transaction.create({
      data: {
        guid: transaction.id,
        accountDebitGuid: transaction.accountDebitId,
        accountCreditGuid: transaction.accountCreditId,
        type: transaction.type,
        value: transaction.value,
        status: transaction.status
      }
    })

    console.log("ressssss", res)

    return transaction
  }

}
