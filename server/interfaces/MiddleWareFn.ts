import { Request, Response, NextFunction } from "express";

export type MiddleWareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
