export default class TransactionType {

  public readonly id?: number | null
  public readonly name: string

  public constructor(id: number | null = null, name: string) {
    this.id = id
    this.name = name
  }

}