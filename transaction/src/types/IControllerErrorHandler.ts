import { Response } from "express";
import IErrorHandler from "./IErrorHandler";

export default interface IControllerErrorHandler extends IErrorHandler {

  getErrorResponse(error: unknown): {}
  respondWithError(res: Response, error: unknown, statusCode: number): void
  respond404(res: Response, message?: string): void

}
