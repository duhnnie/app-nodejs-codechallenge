import IEventMessage from "../types/IEventMessage";

type EventMessageHeaders = Record<string, string|number>

export default class EventMessage<K, V> implements IEventMessage<K, V> {

  private _key: K
  private _value: V
  private _offset: number
  private _partition: number

  constructor(key: K, value: V, headers: EventMessageHeaders = {}, offset: number, partition: number) {
    this._key = key
    this._value = value
    this._partition = partition
    this._offset = offset
  }

  get key(): K {
    return this._key
  }

  get value(): V {
    return this._value
  }

  get offset(): number {
    return this._offset
  }

  get partition(): number {
    return this._partition
  }
}