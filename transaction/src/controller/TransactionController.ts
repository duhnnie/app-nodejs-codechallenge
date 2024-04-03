import { Request, Response } from "express";
import ITransactionRepository from "../types/ITransactionRepository";
import { validatePayload } from "../util/validator";
import ResponseCodes from "../util/ResponseCodes";
import { TransactionCreationDTO, TransactionResponseDTO } from "../dto";
import Transaction from "../models/Transaction";

export default class TransactionController {

  private _repository: ITransactionRepository

  constructor(repository: ITransactionRepository) {
    this._repository = repository
  }

  async createTransaction(req: Request, res: Response) {
    const { body } = req

    const creationDTO = new TransactionCreationDTO(body)
    const errors = await validatePayload(creationDTO)

    if (errors.length) {
      return res.status(ResponseCodes.BAD_REQUEST).json({ errors})
    }

    const transaction = await this._repository.create(
      TransactionCreationDTO.toTransaction(creationDTO)
    )

    const responseDTO = TransactionResponseDTO.fromTransaction(transaction)

    res.status(ResponseCodes.CREATED).json(responseDTO)
  }

  async getTransaction(req: Request, res: Response) {
    const { id } = req.params
    const transaction = await this._repository.findOne(id)

    if (transaction) {
      const responseDTO = TransactionResponseDTO.fromTransaction(transaction)
      res.status(ResponseCodes.OK).json(responseDTO)
      return
    }

    return res.status(ResponseCodes.NOT_FOUND).json({ message: "Not found" })
  }

}