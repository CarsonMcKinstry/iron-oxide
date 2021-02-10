import { isEqual } from "lodash";
import { Some, None } from "../Option";
import { Result } from "./Result";

export type Err<E> = Result<never, E>;

export const Err = <E>(error: E): Err<E> => ({
  isOk() {
    return false;
  },

  isErr() {
    return true;
  },

  map() {
    return Err(error);
  },

  mapErr<F>(proj: (err: E) => F) {
    return Err(proj(error));
  },

  mapOr<U>(def: U) {
    return def;
  },

  mapOrElse<U>(def: () => U) {
    return def();
  },

  ok() {
    return None();
  },

  err() {
    return Some(error);
  },

  and() {
    return Err(error);
  },

  andThen() {
    return Err(error);
  },

  or<T>(res: Result<T, E>) {
    return res;
  },

  orElse<T, U>(op: (a: E) => Result<T, U>) {
    return op(error);
  },

  unwrap(): never {
    console.error(error);
    throw new Error("Called 'Result.unwrap' on an 'Err' value");
  },

  unwrapErr() {
    return error;
  },

  unwrapOr<T>(optb: T) {
    return optb;
  },

  unwrapOrElse<T>(op: (err: E) => T) {
    return op(error);
  },

  expectErr() {
    return error;
  },

  expect(msg: string): never {
    throw new Error(msg);
  },

  eq(res) {
    try {
      const err = res.unwrapErr();

      return isEqual(err, error);
    } catch (_) {
      return false;
    }
  },

  toString() {
    return `Err(${JSON.stringify(error)})`;
  },
});
