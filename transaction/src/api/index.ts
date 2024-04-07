import express, { Request, Response } from "express"
import { createTransactionRouter } from "./transaction.routes"
import TransactionController from "../controller/TransactionController"
import ITransactionUseCase from "../types/ITransactionUseCase"
import IControllerErrorHandler from "../types/IControllerErrorHandler"

export const createAPIService = (useCase: ITransactionUseCase, errorHandler: IControllerErrorHandler) => {
  const controller = new TransactionController(useCase, errorHandler)
  const transactionRouter = createTransactionRouter(controller)
  const app = express()

  app.use(express.json())

  app.get('/', (_: Request, res: Response) => {
    return res.status(200).json({ status: 'OK' })
  })

  app.use("/transaction", transactionRouter)

  return app
}
