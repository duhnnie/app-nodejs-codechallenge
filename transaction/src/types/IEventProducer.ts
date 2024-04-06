export default interface IEventProducer {

  connect(): Promise<void>
  // sendMany(topic: string[], messages: IProducerEventMessage<K, V>[]): Promise<void>
  send(topic: string, key: string | Buffer | null | undefined, value: string | Buffer | null): Promise<void>
  // send(topic: string[], key: K, value: V): Promise<void>
  disconnect(): Promise<void>

}