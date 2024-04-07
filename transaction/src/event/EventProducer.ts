import { Kafka, Producer, Partitioners, Message } from 'kafkajs'
import IEventProducer from "../types/IEventProducer";

export default class EventProducer implements IEventProducer {

  private _kafkaProducer: Producer

  constructor(kafka: Kafka) {
    this._kafkaProducer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner  })
  }

  connect(): Promise<void> {
    return this._kafkaProducer.connect()
  }

  async send(topic: string, key: Message['key'], value: Message['value']): Promise<void> {
    await this._kafkaProducer.send({
      topic,
      messages: [{ key, value }],
      acks: -1, // TODO: configure this one
    })
  }

  disconnect(): Promise<void> {
    return this._kafkaProducer.disconnect()
  }

}