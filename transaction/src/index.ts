import App from "./App"
import SchemaStore from "./stream/SchemaStore"
import { initProcessErrorHandlers } from "./util/errors"

const port = process.env.YAPE_TRANSACTION_API_PORT || 3000

console.log("Starting Transaction service...")

const application = new App({
  apiPort: port,
  kafkaClientId: process.env.YAPE_TRANSACTION_KAFKA_CLIENT_ID as string,
  kafkaBrokers: (process.env.YAPE_TRANSACTION_KAFKA_BROKERS ?? "").split(","),
  kafkaConsumerGroupId: process.env.YAPE_TRANSACTION_KAFKA_CONSUMER_GROUP_ID as string,
  kafkaAntifraudReadTopic: process.env.YAPE_TRANSACTION_KAFKA_READ_TOPIC as string,
  kafkaAntifraudWriteTopic: process.env.YAPE_TRANSACTION_KAFKA_WRITE_TOPIC as string,
})

const schemaRegistryURL = process.env.YAPE_ANTIFRAUD_KAFKA_SCHEMA_REGISTRY_URL || ""

SchemaStore.init(schemaRegistryURL).then(() => {
  console.log("Schema store initialized!")

  return application.start()
}).then(() => {
  console.log("Application up and running!")
}).catch(async (e) => {
  await application.stop()
  console.error(`Error at initiating application ${e}`, e)
})

// Error and process handlers, stops app gracefully
initProcessErrorHandlers(async () => await application.stop())
