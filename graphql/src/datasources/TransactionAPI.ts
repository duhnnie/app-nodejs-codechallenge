import { RESTDataSource } from '@apollo/datasource-rest';
import TransactionAPIGetResponse from '../types/TransactionAPIGetReponse';
import TransactionTypeAPIGetResponse from '../types/TransactionTypeAPIGetResponse';

export default class TransactionAPI extends RESTDataSource {

  // TODO: env vars
  public baseURL: string = process.env.YAPE_TRANSACTION_API_URL ?? "YAPE_TRANSACTION_API_URL"

  async getTransaction(id: string): Promise<TransactionAPIGetResponse> {
    return await this.get<TransactionAPIGetResponse>(`/transaction/${encodeURIComponent(id)}`)
  }

  async getTransactionType(id: number): Promise<TransactionTypeAPIGetResponse> {
    return await this.get<TransactionTypeAPIGetResponse>(`/transaction-type/${id}`)
  }

  async getTransactionTypes(offset: number, limit: number): Promise<TransactionTypeAPIGetResponse[]> {
    return await this.get<TransactionTypeAPIGetResponse[]>(`/transaction-type?offset=${offset}&limit=${limit}`)
  }

  async createTransaction(accountDebitId: string, accountCreditId: string, type: number, value: number): Promise<TransactionAPIGetResponse> {
    return await this.post("/transaction", {
      body: {
        accountDebitId,
        accountCreditId,
        type,
        value
      }
    })
  }

}