import { ValidatorOptions, validate } from "class-validator"

const validatorOptions: ValidatorOptions = {
  forbidUnknownValues: true
}

export const validatePayload = async (obj: {}): Promise<string[]> => {
  const validation = await validate(obj, validatorOptions)
  const errors = validation
    .flatMap(validationItem => Object.values(validationItem.constraints ?? []))

  return errors
}

