import { MiddleWareFn } from "../interfaces/MiddleWareFn";
const catchAsync = (cb: Function) => {
  return <MiddleWareFn>((req, res, next) => {
    cb(req, res, next).catch((err: Error) => next(err));
  });
};
export default catchAsync;
