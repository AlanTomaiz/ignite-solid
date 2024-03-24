import { AppError } from './app-error'

export class MaxDistanceError extends AppError {
  constructor() {
    super('Max distance reached.')
  }
}
