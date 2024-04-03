import ITransactionRepository from "../types/ITransactionRepository";

export default class TransactionRepository {

  private _repository: ITransactionRepository

  constructor(repository: ITransactionRepository) {
    this._repository = repository
  }

  createTransaction(data: any) {
    this._repository.create(data)
  }

}