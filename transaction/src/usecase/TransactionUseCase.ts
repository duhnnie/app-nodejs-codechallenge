import Transaction from "../models/Transaction";
import IEventProducer from "../types/IEventProducer";
import IEventStreamer from "../types/IEventStreamer";
import ITransactionRepository from "../types/ITransactionRepository";
import ITransactionUseCase from "../types/ITransactionUseCase";

export default class TransactionUseCase implements ITransactionUseCase {

  private _repository: ITransactionRepository
  private _eventProducer: IEventProducer<string, string>

  constructor(repository: ITransactionRepository, eventStreamer: IEventStreamer) {
    this._repository = repository
    this._eventProducer = eventStreamer.createProducer<string, string>()
    this._eventProducer.connect()
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await this._repository.create(transaction)
    // this._eventProducer.send(["some topic"], String(transaction.type), transaction.id)
    await this._eventProducer.send("test-topic", String(transaction.type), transaction.id)
    return savedTransaction
  }

  async get(id: string): Promise<Transaction | null> {
    const transaction = await this._repository.findOne(id)

    return transaction
  }

}