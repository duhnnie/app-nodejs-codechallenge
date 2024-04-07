import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry"

// TODO: use envvars
const registry = new SchemaRegistry({ host: "http://localhost:8081" })

// TODO: use envvars
const kafka = new Kafka({
  clientId: 'yape-antifraud',
  brokers: ['localhost:9092']
})
// TODO: use envvars
const consumer = kafka.consumer({ groupId: 'yape-consumer-group' })



consumer.connect()
  .then(async () => await consumer.subscribe({
    // TODO: use envvars
    topic: 'yape_pending',
    fromBeginning: false
  }))
  .then(async () => {
    console.log("Consumer starting...")
    await consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
        pause,
      }) => {
        for (let message of batch.messages) {
          const key = message.key ?? null
          const value = message.value ? await registry.decode(message.value) : null

          console.log({
            topic: batch.topic,
            partition: batch.partition,
            highWatermark: batch.highWatermark,
            message: {
              offset: message.offset,
              key: key?.toString(),
              value: value,
              headers: message.headers,
            }
          })

          resolveOffset(message.offset)
          await heartbeat()
        }
      }
    })

    console.log("Consumer running...")
  })

