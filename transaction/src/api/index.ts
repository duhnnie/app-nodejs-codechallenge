import express, { Request, Response } from "express"
import TransactionRouter from './transaction.routes'

const app = express()

app.get('/', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'OK' })
})

app.use("/transaction", TransactionRouter)

export default app
