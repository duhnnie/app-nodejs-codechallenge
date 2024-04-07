import App from "./App";
import { initProcessErrorHandlers } from "./util/errors";

console.log("Starting Antifraud service...")

const application = new App({
  kafkaBrokers: ["localhost:9092"],
  schemaRegistryURL: "http://localhost:8081",
  kafkaAntifraudReadTopic: "yape_pending",
  kafkaAntifraudWriteTopic: "yape_reviewed",
  kafkaConsumerGroupId: "yape-antifraud-group"
})

application.start().then(() => {
  console.log("Antifraud service is up and running!")
}).catch((error) => {
  console.error(`Antifraud service error: ${error.message}`, error)
})

// --- Error and process interruption handlers ---
initProcessErrorHandlers(async () => await application.stop())