type IProducerEventMessage<K, V> = {
  key: K
  value: V
}

export default interface IEventProducer<K, V> {

  connect(): void
  sendMany(topic: string[], messages: IProducerEventMessage<K, V>[]): void
  send(topic: string[], key: K, value: V): void
  disconnect(): void

}