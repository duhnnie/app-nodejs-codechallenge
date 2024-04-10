import SchemaStore from "../stream/SchemaStore";
import Transaction from "../models/Transaction";
import IEventProducer from "../types/IEventProducer";
import ITransactionRepository from "../types/ITransactionRepository";
import ITransactionUseCase from "../types/ITransactionUseCase";
import SchemaType from "../types/SchemaType";
import TransactionStatus from "../types/TransactionStatus";
import TransactionType from "../models/TransactionType";

export default class TransactionUseCase implements ITransactionUseCase {

  private _repository: ITransactionRepository
  private _eventProducer: IEventProducer
  private _schemaRegistry: SchemaStore
  private _topic: string

  constructor(
    repository: ITransactionRepository,
    eventProducer: IEventProducer,
    schemaRegistry: SchemaStore,
    topic: string
  ) {
    this._repository = repository
    this._eventProducer = eventProducer
    this._schemaRegistry = schemaRegistry
    this._topic = topic
    this._eventProducer.connect()
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await this._repository.create(transaction)

    const encodedMessage = await this._schemaRegistry.encode(SchemaType.Transaction, {
      guid: transaction.id,
      debitAccountId: transaction.accountDebitId, // TODO: be consistent with names
      value: transaction.value,
      status: transaction.status
    })

    await this._eventProducer.send(this._topic, transaction.accountDebitId, encodedMessage)
    console.log(`Message event ${transaction.id} dispatched to yape_pending`)

    return savedTransaction
  }

  async getById(id: string): Promise<Transaction | null> {
    const transaction = await this._repository.findOne(id)

    return transaction
  }


  async approve(id: string): Promise<void> {
    await this._repository.updateStatus(id, TransactionStatus.Approved)
  }

  async reject(id: string): Promise<void> {
    await this._repository.updateStatus(id, TransactionStatus.Rejected)
  }

  async getTypeById(id: number): Promise<TransactionType | null> {
    return await this._repository.findOneType(id)
  }

  async getTypes(): Promise<TransactionType[]> {
    return await this._repository.findTypes()
  }

}