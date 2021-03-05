import { isEqual } from "lodash";
import { Ok } from "../Result";
import { Option, isOption } from "./Option";
import { None } from "./None";

export type Some<T> = Option<T>;

export const Some = <T>(value: T): Some<T> => ({
  isSome() {
    return true;
  },
  isNone() {
    return false;
  },
  unwrap() {
    return value;
  },
  unwrapOr(_: T) {
    return value;
  },
  unwrapOrElse(_: () => T) {
    return value;
  },
  map<U>(proj: (a: T) => U) {
    return Some(proj(value));
  },
  mapOr<U>(_: U, proj: (a: T) => U) {
    return proj(value);
  },
  mapOrElse<U>(_: () => U, proj: (a: T) => U) {
    return proj(value);
  },
  and<U>(optb: Option<U>) {
    return optb;
  },
  andThen<U>(next: (a: T) => Option<U>) {
    return next(value);
  },
  or(_: Option<T>) {
    return Some(value);
  },
  orElse(_: () => Option<T>) {
    return Some(value);
  },

  okOr() {
    return Ok(value);
  },

  okOrElse() {
    return Ok(value);
  },

  filter(predicate: (value: T) => boolean) {
    return predicate(value) ? Some(value) : None();
  },

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (other.isNone()) {
      return None();
    }

    const t = this.unwrap();
    const u = other.unwrap();

    return Some([t, u]);
  },

  expect() {
    return value;
  },

  flatten() {
    if (isOption<T>(value)) {
      return value;
    }

    throw new Error(
      "Flatten can only be used on values of type `Option<Option<T>>`"
    );
  },

  is(op) {
    try {
      const v = op.unwrap();

      return isEqual(v, value);
    } catch (_) {
      return false;
    }
  },

  toString() {
    return `Some(${JSON.stringify(value)})`;
  },
});

export const isSome = <T>(value: Option<T>): value is Some<T> => {
  return value.isSome();
};
