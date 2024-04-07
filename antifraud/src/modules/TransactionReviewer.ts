import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { Consumer, Kafka } from "kafkajs";
import IFraudDetector from "../types/IFraudDetector";
import ITransactionApprover from "../types/ITransactionApprover";
import Transaction from "../types/Transaction";

interface TransactionReviewerOptions {
  kafka: Kafka
  registry: SchemaRegistry
  topic: string
  groupId: string
  detector: IFraudDetector,
  approver: ITransactionApprover
}

export default class TransactionReviewer {

  private _consumer: Consumer
  private _registry: SchemaRegistry
  private _topic: string
  private _detector: IFraudDetector
  private _approver: ITransactionApprover

  constructor({ kafka, registry, topic, groupId, detector, approver }: TransactionReviewerOptions) {
    this._consumer = kafka.consumer({ groupId })
    this._registry = registry
    this._topic = topic
    this._detector = detector
    this._approver = approver
  }

  async start(done: () => void) {
    await this._consumer.connect()

    await this._consumer.subscribe({
      topic: this._topic,
      fromBeginning: true
    })

    await this._consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat
      }) => {
        for (let message of batch.messages) {
          const transaction: Transaction = message.value ? await this._registry.decode(message.value) : null

          if (this._detector.isFraudulent(transaction)) {
            await this._approver.reject(transaction)
            console.log(`Transaction${transaction.guid} was rejected.`)
          } else {
            await this._approver.approve(transaction)
            console.log(`Transaction${transaction.guid} was approved.`)
          }

          resolveOffset(message.offset)
          await heartbeat()
        }
      }
    })

    done()
  }

  async stop() {
    await this._consumer.disconnect()
    await this._approver.close()
  }

}