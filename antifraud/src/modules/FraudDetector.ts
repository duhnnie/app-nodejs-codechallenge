import IFraudDetector from "../types/IFraudDetector";
import Transaction from "../types/Transaction";

export default class FraudDetector implements IFraudDetector {

  isFraudulent(transaction: Transaction): boolean {
    return transaction.value > 1000
  }

}