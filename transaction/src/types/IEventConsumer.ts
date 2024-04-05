import IEventMessage from "./IEventMessage"

export default interface IEventConsumer<K, V> {

  connect(): void
  subscribe(topic: string, fromBeginning: boolean, onMessage: (message: IEventMessage<K, V>) => any): void

}
