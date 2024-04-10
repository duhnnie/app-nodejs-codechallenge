import express, { Request, Response } from "express"
import { createRouter as createTransactionRouter } from "./transaction.routes"
import { createRouter as createTransactionTypesRouter } from './transaction-types.routes'
import TransactionController from "../controller/TransactionController"
import ITransactionUseCase from "../types/ITransactionUseCase"
import IControllerErrorHandler from "../types/IControllerErrorHandler"

export const createAPIService = (useCase: ITransactionUseCase, errorHandler: IControllerErrorHandler) => {
  const controller = new TransactionController(useCase, errorHandler)
  const transactionRouter = createTransactionRouter(controller)
  const transactionTypesRouter = createTransactionTypesRouter(controller)
  const app = express()

  app.use(express.json())

  app.get('/', (_: Request, res: Response) => {
    return res.status(200).json({ status: 'OK' })
  })

  app.use("/transaction", transactionRouter)
  app.use("/transaction-type", transactionTypesRouter)

  return app
}
