import { Option } from "../Option";

export abstract class Result<T, E> {
  abstract map<U>(proj: (a: T) => U): Result<U, E>;
  abstract mapErr<F>(op: (err: E) => F): Result<T, F>;
  abstract mapOr<U>(def: U, proj: (a: T) => U): U;
  abstract mapOrElse<U>(def: () => U, proj: (a: T) => U): U;
  abstract isOk(): boolean;
  abstract isErr(): boolean;
  abstract ok(): Option<T>;
  abstract err(): Option<E>;
  abstract and<U>(res: Result<U, E>): Result<U, E>;
  abstract andThen<U>(op: (a: T) => Result<U, E>): Result<U, E>;
  abstract or(res: Result<T, E>): Result<T, E>;
  abstract orElse<F>(op: (a: E) => Result<T, F>): Result<T, F>;
  abstract unwrap(): T;
  abstract unwrapErr(): E;
  abstract unwrapOr(optb: T): T;
  abstract unwrapOrElse(op: (err: E) => T): T;
  abstract expect(msg: string): T;
  abstract expectErr(msg: string): E;

  static isResult<T, E>(res: unknown): res is Result<T, E> {
    return res instanceof Result;
  }
}

/**
 * things to add...
 *
 * transpose
 */
