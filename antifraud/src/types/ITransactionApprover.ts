import Transaction from "./Transaction";

interface ITransactionApprover {

  approve(transaction: Transaction): Promise<void>
  reject(transaction: Transaction): Promise<void>
  close(): Promise<void>

}

export default ITransactionApprover
