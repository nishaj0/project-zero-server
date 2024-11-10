export class CustomError extends Error {
  // all custom errors will extend this class
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class FieldError extends CustomError {
  // this error is useful when we want to display message for a specific field
  field: string;
  constructor(message: string, statusCode: number, field: string) {
    super(message, statusCode);
    this.field = field;
  }
}

export class ValidationError extends CustomError {
  errors: { path: string; message: string }[];
  constructor(errors: { path: string; message: string }[], message: string) {
    super(message, 400);
    this.errors = errors;
  }
}
