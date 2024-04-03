import { v4 as uuidV4 } from 'uuid'
import TransactionStatus from "../types/TransactionStatus"

export default class Transaction {

  private _id: string
  private _accountDebitId: string
  private _accountCreditId: string
  private _type: number
  private _status: TransactionStatus = TransactionStatus.Pending
  private _value: number
  private _createdAt: Date | null

  constructor(
    id :string = uuidV4(),
    accountDebitId: string,
    accountCreditId: string,
    type: number,
    value: number,
    createdAt: Date | null = null
  ) {
    this._type = type
    this._accountDebitId = accountDebitId
    this._accountCreditId = accountCreditId
    this._value = value
    this._id = id
    this._createdAt = createdAt
  }

  get id() {
    return this._id
  }

  get accountDebitId() {
    return this._accountDebitId
  }

  get accountCreditId() {
    return this._accountCreditId
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
