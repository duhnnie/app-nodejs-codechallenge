import { PrismaClient } from "@prisma/client";
import Transaction from "../models/Transaction";
import ITransactionRepository from "../types/ITransactionRepository";
import TransactionStatus from "../types/TransactionStatus";

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

    return new Transaction(
      res.guid,
      res.accountDebitGuid,
      res.accountCreditGuid,
      res.type,
      res.value,
      res.status as TransactionStatus,
      res.createdAt
    )
  }

  async findOne(id: string): Promise<Transaction | null> {
    const transaction = await this._db.transaction.findUnique({
      where: { guid: id }
    })

    if (transaction) {
      return new Transaction(
        transaction.guid,
        transaction.accountDebitGuid,
        transaction.accountCreditGuid,
        transaction.type,
        transaction.value,
        transaction.status as TransactionStatus,
        transaction.createdAt
      )
    }

    return null
  }
}
