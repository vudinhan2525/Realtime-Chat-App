class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;
  field: string;
  constructor(message: string, statusCode: number, field: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    this.field = field;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
