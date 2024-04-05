import IEventConsumer from "../types/IEventConsumer";
import IEventProducer from "../types/IEventProducer";
import IEventStreamer from "../types/IEventStreamer";
import EventConsumer from "./EventConsumer";
import EventProducer from "./EventProducer";

export default class EventStreamer implements IEventStreamer {

  createProducer<K, V>(): IEventProducer<K, V> {
    return new EventProducer<K, V>()
  }
  createConsumer<K, V>(groupId: string): IEventConsumer<K, V> {
    return new EventConsumer<K, V>(groupId)
  }

}