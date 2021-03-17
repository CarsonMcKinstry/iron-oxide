import { Result, isResult } from "./Result";

export type Err<E> = Result<any, E>;

export function Err<E>(error: E): Err<E> {
  return new Result(undefined, error);
}

export const isErr = <E>(result: unknown): result is Err<E> => {
  return isResult(result) && result.isErr();
};
