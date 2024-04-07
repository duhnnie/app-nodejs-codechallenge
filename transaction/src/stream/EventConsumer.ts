import { Consumer, Kafka } from "kafkajs";
import IEventConsumer, { OnMessage } from "../types/IEventConsumer";
import IEventMessage from "../types/IEventMessage";

export default class EventConsumer implements IEventConsumer {

  private _kafkaConsumer: Consumer

  constructor(kafka: Kafka, groupId: string) {
    this._kafkaConsumer = kafka.consumer({ groupId: groupId })
  }

  async connect(): Promise<void> {
    await this._kafkaConsumer.connect()
  }

  async subscribe(topic: string, fromBeginning: boolean): Promise<void> {
    await this._kafkaConsumer.subscribe({ topic, fromBeginning })
  }

  async consume(onMessage: OnMessage): Promise<void> {
    await this._kafkaConsumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat
      }) => {
        for (let message of batch.messages) {
          let eventMessage: IEventMessage = {
            key: message.key,
            value: message.value,
            offset: parseInt(message.offset, 10)
          }

          const res = await onMessage(eventMessage)

          if (res) {
            resolveOffset(message.offset)
          }

          await heartbeat()
        }
      }
    })
  }

  async close(): Promise<void> {
    await this._kafkaConsumer.disconnect()
  }

}