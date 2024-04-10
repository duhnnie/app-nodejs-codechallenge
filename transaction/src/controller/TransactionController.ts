import { Request, Response } from "express";
import { validatePayload } from "../util/validator";
import ResponseCode from "../util/ResponseCode";
import { TransactionCreationDTO } from "../dto";
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
        creationDTO.toTransaction()
      )

      res.status(ResponseCode.CREATED).json(transaction)
    } catch (error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, 500)
    }
  }

  async getTransaction(req: Request, res: Response) {
    const { id } = req.params

    try {
      const transaction = await this._useCase.getById(id)

      if (transaction) {
        res.status(ResponseCode.OK).json(transaction)
        return
      }

      this._errorHandler.respond404(res)
    } catch (error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, ResponseCode.INTERNAL_SERVER_ERROR)
    }
  }

  async getTransactionType(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10)

    if (isNaN(id)) {
      const error = new Error('Invalid parameter, number expected.')
      this._errorHandler.respondWithError(res, error, ResponseCode.BAD_REQUEST)
    }

    try {
      const transactionType = await this._useCase.getTypeById(id)

      if (transactionType) {
        return res.status(ResponseCode.OK).json(transactionType)
      }

      this._errorHandler.respond404(res)
    } catch (error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, ResponseCode.INTERNAL_SERVER_ERROR)
    }
  }

  async getTransactionTypes(req: Request, res: Response) {
    const { offset = 0, limit = 50 } = req.query

    try {
      const transactionTypes = await this._useCase.getTypes(
        Number(offset),
        Number(limit)
      )

      return res.status(ResponseCode.OK).json(transactionTypes)
    } catch(error) {
      this._errorHandler.onError(error)
      this._errorHandler.respondWithError(res, error, ResponseCode.INTERNAL_SERVER_ERROR)
    }
  }

}