import type { Express } from "express"
import { PrismaClient } from "@prisma/client"
import { createAPIService } from "./api"
import AntifraudController from "./controller/AntifraudController"
import ControllerErrorHandler from "./errorHandlers/ControllerErrorHandler"
import EventStreamer from "./stream/EventStreamer"
import SchemaStore from "./stream/SchemaStore"
import TransactionRepository from "./repository/TransactionRepository"
import TransactionUseCase from "./usecase/TransactionUseCase"

interface AppOptions {
  apiPort: string | number
  kafkaClientId: string
  kafkaBrokers: string[]
  kafkaConsumerGroupId: string
  kafkaAntifraudReadTopic: string
  kafkaAntifraudWriteTopic: string
}

export default class App {

  private _antifraudModule: AntifraudController
  private _apiModule: Express
  private _apiPort: string | number
  private _started: boolean = false

  constructor({
    apiPort,
    kafkaClientId,
    kafkaBrokers,
    kafkaConsumerGroupId,
    kafkaAntifraudReadTopic,
    kafkaAntifraudWriteTopic,
  }: AppOptions) {
    const repository = new TransactionRepository(new PrismaClient())
    const eventStreamer = new EventStreamer(kafkaClientId, kafkaBrokers)
    const eventProducer = eventStreamer.createProducer()
    const eventConsumer = eventStreamer.createConsumer(kafkaConsumerGroupId)
    const useCase = new TransactionUseCase(repository, eventProducer, SchemaStore.instance, kafkaAntifraudWriteTopic)
    const errorHandler = new ControllerErrorHandler()

    this._apiPort = apiPort

    this._antifraudModule = new AntifraudController(
      useCase,
      eventConsumer,
      SchemaStore.instance,
      kafkaAntifraudReadTopic
    )

    this._apiModule = createAPIService(useCase, errorHandler)
  }

  async start() {
    if (this._started) return

    const { _antifraudModule, _apiModule, _apiPort } = this

    await _antifraudModule.start()
    console.log("Antifraud module started")

    _apiModule.listen(_apiPort, () => {
      console.log(`Transaction API listening at port ${_apiPort}`)
    })

    this._started = true
  }

  async stop() {
    await this._antifraudModule.stop()
    this._started = false
  }

}