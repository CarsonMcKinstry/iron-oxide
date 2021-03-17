import { isResult, Result } from "./Result";

export type Ok<T> = Result<T, any>;

export function Ok<T>(value: T): Ok<T> {
  return new Result(value);
}

export const isOk = <T>(result: unknown): result is Ok<T> => {
  return isResult(result) && result.isOk();
};
