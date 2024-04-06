export default interface IEventProducer<K, V> {

  connect(): Promise<void>
  // sendMany(topic: string[], messages: IProducerEventMessage<K, V>[]): Promise<void>
  send(topic: string, key: K, value: V): Promise<void>
  // send(topic: string[], key: K, value: V): Promise<void>
  disconnect(): Promise<void>

}