import { Kafka, Partitioners, Producer } from "kafkajs";
import ITransactionApprover from "../types/ITransactionApprover";
import Transaction from "../types/Transaction";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import TransactionStatus from "../types/TransactionStatus";

export default class TransactionApprover implements ITransactionApprover {

  private _producer: Producer
  private _registry: SchemaRegistry
  private _topic: string

  constructor(kafka: Kafka, registry: SchemaRegistry, topic: string) {
    this._producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
    this._topic = topic
    this._registry = registry
    this._producer.connect()
  }

  private async send(transaction: Transaction, approved: boolean): Promise<void> {
    const transactionSchemaId = await this._registry.getLatestSchemaId("yape.Transaction")
    const key = transaction.debitAccountId

    const messageValue: Transaction = {
      ...transaction,
      status: approved ? TransactionStatus.Approved : TransactionStatus.Rejected
    }

    const value = await this._registry.encode(transactionSchemaId, messageValue)

    await this._producer.send({
      topic: this._topic,
      messages: [{ key, value }],
      acks: -1 // TODO: configure this one
    })
  }

  async approve(transaction: Transaction): Promise<void> {
    await this.send(transaction, true)
  }

  async reject(transaction: Transaction): Promise<void> {
    await this.send(transaction, false)
  }

  async close(): Promise<void> {
    await this._producer.disconnect()
  }

}