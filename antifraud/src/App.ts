import { Kafka } from "kafkajs";
import TransactionReviewer from "./modules/TransactionReviewer";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import FraudDetector from "./modules/FraudDetector";
import TransactionApprover from "./modules/TransactionApprover";

interface AppOptions {
  kafkaBrokers: string[]
  schemaRegistryURL: string
  kafkaAntifraudReadTopic: string
  kafkaAntifraudWriteTopic: string
  kafkaConsumerGroupId: string
}

export default class App {

  private _reviewer: TransactionReviewer
  private _started: boolean = false

  constructor({
    kafkaBrokers,
    schemaRegistryURL,
    kafkaAntifraudReadTopic,
    kafkaAntifraudWriteTopic,
    kafkaConsumerGroupId
  }: AppOptions) {
    const kafka = new Kafka({ brokers: kafkaBrokers })
    const registry = new SchemaRegistry({ host: schemaRegistryURL })
    const fraudDetector = new FraudDetector()
    const transactionApprover = new TransactionApprover(kafka, registry, kafkaAntifraudWriteTopic)

    this._reviewer = new TransactionReviewer({
      kafka,
      registry,
      topic: kafkaAntifraudReadTopic,
      groupId: kafkaConsumerGroupId,
      detector: fraudDetector,
      approver: transactionApprover
    })
  }

  async start() {
    if (this._started) { return }
    await this._reviewer.start()
    console.log("Antifraud Reviewer is up and running.")
    this._started = true
  }

  async stop() {
    await this._reviewer.stop()
    this._started = false
  }

}