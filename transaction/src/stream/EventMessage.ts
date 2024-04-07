import IEventMessage from "../types/IEventMessage";

type EventMessageHeaders = Record<string, string|number>

export default class EventMessage implements IEventMessage {

  private _key: Buffer
  private _value: Buffer
  private _offset: number
  private _partition: number

  constructor(key: Buffer, value: Buffer, headers: EventMessageHeaders = {}, offset: number, partition: number) {
    this._key = key
    this._value = value
    this._partition = partition
    this._offset = offset
  }

  get key(): Buffer {
    return this._key
  }

  get value(): Buffer {
    return this._value
  }

  get offset(): number {
    return this._offset
  }

  get partition(): number {
    return this._partition
  }
}