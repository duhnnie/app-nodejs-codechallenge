import express from "express"
import TransactionController from "../controller/TransactionController";

export const createTransactionRouter = (controller: TransactionController) => {
  const router = express.Router();

  router.post("/", controller.createTransaction.bind(controller))
  router.get("/:id", controller.getTransaction.bind(controller))
  router.get("/type/:id", controller.getTransactionType.bind(controller))

  return router
}
