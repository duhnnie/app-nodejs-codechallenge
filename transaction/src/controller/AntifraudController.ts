import { TransactionStatus } from "@prisma/client";
import SchemaStore from "../stream/SchemaStore";
import IEventConsumer from "../types/IEventConsumer";
import IEventMessage from "../types/IEventMessage";
import ITransactionEventMessage from "../types/ITransactionEventMessage";
import ITransactionUseCase from "../types/ITransactionUseCase";

export default class AntifraudController {

  private _useCase: ITransactionUseCase
  private _registry: SchemaStore
  private _consumer: IEventConsumer
  private _topic: string

  constructor(useCase: ITransactionUseCase, consumer: IEventConsumer, registry: SchemaStore, topic: string) {
    this._useCase = useCase
    this._consumer = consumer
    this._registry = registry
    this._topic = topic
  }

  private async _onMessage(message: IEventMessage): Promise<boolean> {
    const decodedMessage: ITransactionEventMessage  = message.value ? await this._registry.decode(message.value) : null

    if (!decodedMessage) { return true }

    if (decodedMessage.status === TransactionStatus.APPROVED) {
      await this._useCase.approve(decodedMessage.guid)
    } else if (decodedMessage.status === TransactionStatus.REJECTED) {
      await this._useCase.reject(decodedMessage.guid)
    }

    return true
  }

  async start() {
    await this._consumer.connect()
    await this._consumer.subscribe(this._topic, true)
    await this._consumer.consume(this._onMessage.bind(this))
  }

  async stop() {
    this._consumer.close()
  }

}