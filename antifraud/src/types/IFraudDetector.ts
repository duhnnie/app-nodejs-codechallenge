import Transaction from "./Transaction";

interface IFraudDetector {

  isFraudulent(transaction: Transaction): boolean

}

export default IFraudDetector
