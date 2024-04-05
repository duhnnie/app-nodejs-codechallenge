import IEventProducer from "../types/IEventProducer";

export default class EventProducer<K, V> implements IEventProducer<K, V> {

  connect(): void {}

  sendMany(topic: string[], messages: { key: K; value: V; }[]): void {}

  send(topic: string[], key: K, value: V): void {}

  disconnect(): void {}

}