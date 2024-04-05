class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;
  field: string[];
  messageError: string[];
  constructor(messageError: string[], statusCode: number, field: string[]) {
    super();
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    this.field = field;
    this.messageError = messageError;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
