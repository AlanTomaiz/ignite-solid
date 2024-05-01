import { AppError } from './app-error'

export class CheckInExpiredError extends AppError {
  constructor() {
    super('CheckIn has expired.')
  }
}
