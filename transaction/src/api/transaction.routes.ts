import express, { Request, Response } from "express"
import TransactionController from "../controller/TransactionController";
import TransactionRepository from "../repository/TransactionRepository";
import TransactionUseCase from "../usecase/TransactionUseCase";
import ControllerErrorHandler from "../errorHandlers/ControllerErrorHandler";
import EventStreamer from "../event/EventStreamer";
import SchemaRegistry from "../messageSchema/SchemaRegistry";

const router = express.Router();
const repository = new TransactionRepository()
const eventStreamer = new EventStreamer("transaction_service", ["127.0.0.1:9092"]) // TODO: use proper data and parameterize in env vars
const errorHandler = new ControllerErrorHandler()
const useCase = new TransactionUseCase(repository, eventStreamer, SchemaRegistry.instance)
const controller = new TransactionController(useCase, errorHandler)

router.post("/", controller.createTransaction.bind(controller))
router.get("/:id", controller.getTransaction.bind(controller))

export default router
