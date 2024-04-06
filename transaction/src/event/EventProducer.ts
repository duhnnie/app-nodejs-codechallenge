import { Kafka, Producer, Partitioners } from 'kafkajs'
import IEventProducer from "../types/IEventProducer";

export default class EventProducer<K, V> implements IEventProducer<K, V> {

  private _kafkaProducer: Producer

  constructor(kafka: Kafka) {
    this._kafkaProducer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner  })
  }

  connect(): Promise<void> {
    return this._kafkaProducer.connect()
  }

  send(topic: string, key: K, value: V): Promise<void> {
    const res = this._kafkaProducer.send({
      topic,
      messages: [{
        key: String(key),
        value: String(value)
      }],
      acks: -1, // TODO: configure this one
    })

    console.log("XXXXXX returned from send():", res)

    return Promise.resolve()
  }

  disconnect(): Promise<void> {
    return this._kafkaProducer.disconnect()
  }

}