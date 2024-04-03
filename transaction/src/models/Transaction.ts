import { V4 as uuidV4 } from 'uuid'
import TransactionStatus from "../types/TransactionStatus"
import TransactionType from "../types/TransactionType"

export default class Transaction {

  private _id: string
  private _accountDebitId: string
  private _accountCreditId: string
  private _type: TransactionType
  private _status: TransactionStatus = TransactionStatus.Pending
  private _value: number
  private _createdAt: Date | null

  constructor(
    id :string = uuidV4(),
    accountDebitId: string,
    accountCreditId: string,
    type: TransactionType,
    value: number
  ) {
    this._type = type
    this._accountDebitId = accountDebitId
    this._accountCreditId = accountCreditId
    this._value = value
    this._id = id
    this._createdAt = null
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
