import App from "./App"
import SchemaStore from "./stream/SchemaStore"
import { initProcessErrorHandlers } from "./util/errors"

const port = process.env.PORT || 3000

console.log("Starting Transaction service...")

const application = new App({
  apiPort: port,
  kafkaClientId: "yape_transaction_service",
  kafkaBrokers: ["127.0.0.1:9092"],
  kafkaConsumerGroupId: "yape_transaction_consumer_group",
  kafkaAntifraudReadTopic: "yape_reviewed",
  kafkaAntifraudWriteTopic: "yape_pending"
})

SchemaStore.init("http://localhost:8081").then(() => {
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
