import express from "express"
import TransactionController from "../controller/TransactionController";

export const createRouter = (controller: TransactionController) => {
  const router = express.Router();

  router.post("/", controller.createTransaction.bind(controller))
  router.get("/:id", controller.getTransaction.bind(controller))

  return router
}
