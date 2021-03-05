import { isEqual } from "lodash";
import { Some, None } from "../Option";
import { Result } from "./Result";

export type Ok<T> = Result<T, never>;

export const Ok = <T>(value: T): Ok<T> => ({
  isOk() {
    return true;
  },

  isErr() {
    return false;
  },

  ok() {
    return Some(value);
  },

  err() {
    return None();
  },

  map<U>(proj: (a: T) => U) {
    return Ok<U>(proj(value));
  },

  mapErr() {
    return Ok(value);
  },

  mapOr<U>(_: U, proj: (a: T) => U) {
    return proj(value);
  },

  mapOrElse<U>(_: () => U, proj: (a: T) => U) {
    return proj(value);
  },

  and<U, E>(res: Result<U, E>) {
    return res;
  },

  andThen<U, E>(op: (a: T) => Result<U, E>) {
    return op(value);
  },

  or() {
    return Ok(value);
  },

  orElse() {
    return Ok(value);
  },

  unwrap() {
    return value;
  },

  unwrapOr() {
    return value;
  },

  unwrapOrElse() {
    return value;
  },

  unwrapErr(): never {
    throw new Error(`Called 'Result.unwrapErr' on an 'Ok' value: ${value}`);
  },

  expect() {
    return value;
  },

  expectErr(msg: string): never {
    throw new Error(msg);
  },

  is(res) {
    try {
      const v = res.unwrap();

      return isEqual(v, value);
    } catch (_) {
      return false;
    }
  },

  toString() {
    return `Ok(${JSON.stringify(value)})`;
  },
});

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => {
  return result.isOk();
};
