import express, { Request, Response } from "express"
import TransactionController from "../controller/TransactionController";
import TransactionRepository from "../repository/TransactionRepository";

const router = express.Router();
const repository = new TransactionRepository()
const controller = new TransactionController(repository)

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ id: req.params.id })
})

router.post("/", controller.createTransaction.bind(controller))

export default router
