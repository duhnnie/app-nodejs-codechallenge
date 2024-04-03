import TransactionStatus from "../types/TransactionStatus"
import TransactionType from "../types/TransactionType"

export default class Transaction {

  private _id: string | null
  private _type: TransactionType
  private _status: TransactionStatus = TransactionStatus.Pending
  private _value: number
  private _createdAt: Date

  constructor(type: TransactionType, value: number, id : string|null = null) {
    this._type = type
    this._value = value
    this._id = id
    this._createdAt = new Date()
  }

  get id() {
    return this._id
  }

  get type() {
    return this._type
  }

  get status() {
    return this._status
  }

  get value() {
    return this._value
  }

  get createdAt() {
    return this._createdAt
  }
}
