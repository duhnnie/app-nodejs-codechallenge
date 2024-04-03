import express, { Request, Response } from "express"
import TransactionController from "../controller/TransactionController";
import TransactionRepository from "../repository/TransactionRepository";

const router = express.Router();
const repository = new TransactionRepository()
const controller = new TransactionController(repository)

router.post("/", controller.createTransaction.bind(controller))
router.get("/:id", controller.getTransaction.bind(controller))

export default router
