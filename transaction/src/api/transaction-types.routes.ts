import express from "express"
import TransactionController from "../controller/TransactionController";

export const createRouter = (controller: TransactionController) => {
  const router = express.Router();

  router.get("/", controller.getTransactionTypes.bind(controller))
  router.get("/:id", controller.getTransactionType.bind(controller))

  return router
}
