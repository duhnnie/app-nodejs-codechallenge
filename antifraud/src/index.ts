import App from "./App";
import { initProcessErrorHandlers } from "./util/errors";

console.log("Starting Antifraud service...", )

const application = new App({
  kafkaBrokers: (process.env.YAPE_ANTIFRAUD_KAFKA_BROKERS || "").split(","),
  schemaRegistryURL: process.env.YAPE_ANTIFRAUD_KAFKA_SCHEMA_REGISTRY_URL as string,
  kafkaAntifraudReadTopic: process.env.YAPE_ANTIFRAUD_KAFKA_READ_TOPIC as string,
  kafkaAntifraudWriteTopic: process.env.YAPE_ANTIFRAUD_KAFKA_WRITE_TOPIC as string,
  kafkaConsumerGroupId: process.env.YAPE_ANTIFRAUD_KAFKA_CONSUMER_GROUP_ID as string,
})

application.start().then(() => {
  console.log("Antifraud service is up and running!")
}).catch((error) => {
  console.error(`Antifraud service error: ${error.message}`, error)
})

// --- Error and process interruption handlers ---
initProcessErrorHandlers(async () => await application.stop())