import IEventConsumer from "../types/IEventConsumer";
import IEventMessage from "../types/IEventMessage";

export default class EventConsumer<K, V> implements IEventConsumer<K, V> {

  private _groupId

  constructor(groupId: string) {
    this._groupId = groupId
  }

  connect(): void {}

  subscribe(topic: string, fromBeginning: boolean, onMessage: (message: IEventMessage<K, V>) => any): void {}

}