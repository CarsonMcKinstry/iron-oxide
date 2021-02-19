import { Option } from "../Option";
import { Err } from "./Err";
import { Ok } from "./Ok";

export interface Result<T, E> {
  map<U>(proj: (a: T) => U): Result<U, E>;
  mapErr<F>(op: (err: E) => F): Result<T, F>;
  mapOr<U>(def: U, proj: (a: T) => U): U;
  mapOrElse<U>(def: () => U, proj: (a: T) => U): U;
  isOk(): boolean;
  isErr(): boolean;
  ok(): Option<T>;
  err(): Option<E>;
  and<U>(res: Result<U, E>): Result<U, E>;
  andThen<U>(op: (a: T) => Result<U, E>): Result<U, E>;
  or(res: Result<T, E>): Result<T, E>;
  orElse<F>(op: (a: E) => Result<T, F>): Result<T, F>;
  unwrap(): T;
  unwrapErr(): E;
  unwrapOr(optb: T): T;
  unwrapOrElse(op: (err: E) => T): T;
  expect(msg: string): T;
  expectErr(msg: string): E;
  is(res: Result<T, E>): boolean;
  toString(): string;
}

function from<T>(value: T): Result<T, never>;
function from<T, E>(value: null, error: E): Result<never, E>;
function from(value: any, error?: any): Result<any, any> {
  if (value === null && error) {
    return Err(error);
  }

  return Ok(value);
}

export const Result = {
  isResult<T, E>(value: any): value is Result<T, E> {
    return [
      "map",
      "mapErr",
      "mapOr",
      "mapOrElse",
      "isOk",
      "isErr",
      "ok",
      "err",
      "and",
      "andThen",
      "or",
      "orElse",
      "unwrap",
      "unwrapErr",
      "unwrapOr",
      "unwrapOrElse",
      "expect",
      "expectErr",
      "eq",
    ].every((prop) => value.hasOwnProperty(prop));
  },
  from,
};
