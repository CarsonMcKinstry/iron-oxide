import { Result } from "../Result";
import { None } from "./None";
import { Some } from "./Some";

export interface Option<T> {
  isSome(): boolean;
  isNone(): boolean;
  unwrap(): T;
  unwrapOr(def: T): T;
  unwrapOrElse(f: () => T): T;
  map<U>(proj: (a: T) => U): Option<U>;
  mapOr<U>(def: U, proj: (a: T) => U): U;
  mapOrElse<U>(def: () => U, proj: (a: T) => U): U;
  okOr<E>(err: E): Result<T, E>;
  okOrElse<E>(err: () => E): Result<T, E>;
  and<U>(optb: Option<U>): Option<U>;
  andThen<U>(f: (a: T) => Option<U>): Option<U>;
  or(optb: Option<T>): Option<T>;
  orElse(f: () => Option<T>): Option<T>;
  filter(predicate: (a: T) => boolean): Option<T>;
  zip<U>(other: Option<U>): Option<[T, U]>;
  expect(msg: string): T;
  flatten(): Option<T>;
  eq(op: Option<T>): boolean;
  toString(): string;
}

function from<T>(value: T): Option<T>;
function from(value?: null): Option<never>;
function from(value: any): Option<any> {
  if (value === undefined || value === null) {
    return None();
  }

  return Some(value);
}

export const Option = {
  isOption<T>(value: any): value is Option<T> {
    return [
      "isSome",
      "isNone",
      "unwrap",
      "unwrapOr",
      "unwrapOrElse",
      "map",
      "mapOr",
      "mapOrElse",
      "okOr",
      "okOrElse",
      "and",
      "andThen",
      "or",
      "orElse",
      "filter",
      "zip",
      "expect",
      "eq",
    ].every((prop) => value.hasOwnProperty(prop));
  },
  from,
};
