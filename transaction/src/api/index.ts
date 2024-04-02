import { Request, Response } from "express"
import express from "express"

const app = express()

app.get('/', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'OK' })
})

export default app
