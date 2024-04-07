import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry"
import TransactionReviewer from "./modules/TransactionReviewer";
import FraudDetector from "./modules/FraudDetector";
import TransactionApprover from "./modules/TransactionApprover";

const kafka = new Kafka({ brokers: ["localhost:9092"] })
const registry = new SchemaRegistry({ host: "http://localhost:8081" })
const detector = new FraudDetector()
const approver = new TransactionApprover(kafka, registry, "yape_reviewed")
const reviewer = new TransactionReviewer({
  kafka,
  registry,
  topic: "yape_pending", // TODO: configure this
  groupId: "yape-antifraud-group",
  detector,
  approver
})

const run = async () => {
  await reviewer.start(() => {
    console.log("Antifraud service is up and running!")
  })
}

run().catch((error) => {
  console.error(`Antifraud service error: ${error.message}`, error)
})

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINIT', 'SIGUSR2']

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await reviewer.stop()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await reviewer.stop()
    } finally {
      process.kill(process.pid, type)
    }
  })
})
