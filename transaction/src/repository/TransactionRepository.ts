import { PrismaClient } from "@prisma/client";
import Transaction from "../models/Transaction";
import ITransactionRepository from "../types/ITransactionRepository";
import TransactionStatus from "../types/TransactionStatus";
import TransactionType from "../models/TransactionType";

export default class TransactionRepository implements ITransactionRepository {

  private _db: PrismaClient

  constructor(db: PrismaClient) {
    this._db = db
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const res = await this._db.transaction.create({
      data: {
        guid: transaction.id,
        accountDebitGuid: transaction.accountDebitId,
        accountCreditGuid: transaction.accountCreditId,
        typeId: transaction.type,
        value: transaction.value,
        status: transaction.status
      }
    })

    return new Transaction(
      res.guid,
      res.accountDebitGuid,
      res.accountCreditGuid,
      res.typeId,
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
        transaction.typeId,
        transaction.value,
        transaction.status as TransactionStatus,
        transaction.createdAt
      )
    }

    return null
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<void> {
    await this._db.transaction.update({
      data: { status: status as TransactionStatus },
      where: { guid: id }
    })
  }

  async findOneType(id: number): Promise<TransactionType | null> {
    const res = await this._db.transactionType.findUnique({
      where: { id }
    })

    if (res) {
      return new TransactionType(res.id, res.name)
    } else {
      return null
    }
  }

}
