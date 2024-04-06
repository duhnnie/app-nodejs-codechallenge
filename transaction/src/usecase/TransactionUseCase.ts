import SchemaRegistry from "../messageSchema/SchemaRegistry";
import Transaction from "../models/Transaction";
import IEventProducer from "../types/IEventProducer";
import IEventStreamer from "../types/IEventStreamer";
import ITransactionRepository from "../types/ITransactionRepository";
import ITransactionUseCase from "../types/ITransactionUseCase";
import SchemaType from "../types/SchemaType";

export default class TransactionUseCase implements ITransactionUseCase {

  private _repository: ITransactionRepository
  private _eventProducer: IEventProducer
  private _schemaRegistry: SchemaRegistry

  constructor(repository: ITransactionRepository, eventStreamer: IEventStreamer, schemaRegistry: SchemaRegistry) {
    this._repository = repository
    this._eventProducer = eventStreamer.createProducer()
    this._schemaRegistry = schemaRegistry
    this._eventProducer.connect()
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await this._repository.create(transaction)

    const encodedMessage = await this._schemaRegistry.encode(SchemaType.Transaction, {
      guid: transaction.id,
      value: transaction.value
    })

    // TODO: use env var for topic name
    await this._eventProducer.send("yape_pending", transaction.accountDebitId, encodedMessage)
    console.log(`Message event ${transaction.id} dispatched to yape_pending`)

    return savedTransaction
  }

  async get(id: string): Promise<Transaction | null> {
    const transaction = await this._repository.findOne(id)

    return transaction
  }

}