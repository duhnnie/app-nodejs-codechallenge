import { Request, Response } from "express";
import { validatePayload } from "../util/validator";
import ResponseCode from "../util/ResponseCode";
import { TransactionCreationDTO, TransactionResponseDTO } from "../dto";
import ITransactionUseCase from "../types/ITransactionUseCase";
import IControllerErrorHandler from "../types/IControllerErrorHandler";

export default class TransactionController {

  private _useCase: ITransactionUseCase
  private _errorHandler: IControllerErrorHandler

  constructor(useCase: ITransactionUseCase, errorHandler: IControllerErrorHandler) {
    this._useCase = useCase
    this._errorHandler = errorHandler
  }

  async createTransaction(req: Request, res: Response) {
    const { body } = req

    const creationDTO = new TransactionCreationDTO(body)
    const errors = await validatePayload(creationDTO)

    if (errors.length) {
      return res.status(ResponseCode.BAD_REQUEST).json({ errors})
    }

    try {
      const transaction = await this._useCase.create(
        TransactionCreationDTO.toTransaction(creationDTO)
      )

      const responseDTO = TransactionResponseDTO.fromTransaction(transaction)

      res.status(ResponseCode.CREATED).json(responseDTO)
    } catch (error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, 500)
    }
  }

  async getTransaction(req: Request, res: Response) {
    const { id } = req.params

    try {
      const transaction = await this._useCase.get(id)

      if (transaction) {
        const responseDTO = TransactionResponseDTO.fromTransaction(transaction)
        res.status(ResponseCode.OK).json(responseDTO)
        return
      }

      this._errorHandler.respond404(res)
    } catch (error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, 500)
    }
  }

}