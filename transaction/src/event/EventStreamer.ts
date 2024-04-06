import { Kafka } from 'kafkajs'
import IEventStreamer from "../types/IEventStreamer";
import EventConsumer from "./EventConsumer";
import EventProducer from "./EventProducer";

export default class EventStreamer implements IEventStreamer {

  private _kafka: Kafka

  constructor(clientId: string, brokers: string[]) {
    this._kafka = new Kafka({ clientId, brokers })
  }

  createProducer(): EventProducer {
    return new EventProducer(this._kafka)
  }

  createConsumer<K, V>(groupId: string): EventConsumer<K, V> {
    return new EventConsumer<K, V>(groupId)
  }

}