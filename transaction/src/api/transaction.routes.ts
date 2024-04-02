import express, { Request, Response } from "express"

const router = express.Router();

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ id: req.params.id })
})

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Transaction created" })
})

export default router
