import { Response } from "express";
import IControllerErrorHandler from "../types/IControllerErrorHandler";
import ResponseCode from "../util/ResponseCode";

export default class ControllerErrorHandler implements IControllerErrorHandler {

  getErrorResponse(error: unknown): {} {
    return {
      message: "An error ocurred, please try again."
    }
  }

  respondWithError(res: Response<any, Record<string, any>>, error: unknown, statusCode: number): void {
    res.status(statusCode).json(this.getErrorResponse(error))
  }

  onError(error: unknown): void {
    console.error("An error ocurred", error)
  }

  respond404(res: Response<any, Record<string, any>>, message: string = "Resource not found."): void {
    res.status(ResponseCode.NOT_FOUND).json({ message })
  }

}