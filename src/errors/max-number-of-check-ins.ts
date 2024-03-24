import { AppError } from './app-error'

export class MaxNumberOfCheckInsError extends AppError {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
