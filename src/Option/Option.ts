import { Err, Ok, Result } from "../Result";
import isEqual from "lodash/isEqual";
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
  is(op: Option<T>): boolean;
  toString(): string;
}

export class Option<T> implements Option<T> {
  private value?: T = undefined;

  constructor(value?: T) {
    this.value = value;
  }

  // is Some if vale is not undefined or null
  isSome(): this is Some<T> {
    return this.value != undefined;
  }

  // is None if value is undefined or null
  isNone(): this is None {
    return this.value == undefined;
  }

  okOr<E>(error: E): Result<T, E> {
    if (this.isSome()) {
      return Ok(this.value!);
    }

    return Err(error);
  }

  okOrElse<E>(error: () => E): Result<T, E> {
    if (this.isSome()) {
      return Ok(this.value!);
    }

    return Err(error());
  }

  unwrap(): T {
    if (this.isSome()) {
      return this.value!;
    }

    throw new Error("Called 'Option.unwrap' on a 'None' value");
  }

  unwrapOr<U>(def: U): T | U {
    if (this.isSome()) {
      return this.value!;
    }

    return def;
  }

  unwrapOrElse<U>(def: () => U): T | U {
    if (this.isSome()) {
      return this.value!;
    }

    return def();
  }

  map<U>(proj: (a: T) => U): Option<U> {
    if (this.isSome()) {
      return Some(proj(this.value!));
    }

    return this;
  }

  mapOr<U>(def: U, proj: (a: T) => U): T | U {
    if (this.isSome()) {
      return proj(this.value!);
    }

    return def;
  }

  mapOrElse<U>(def: () => U, proj: (a: T) => U): T | U {
    if (this.isSome()) {
      return proj(this.value!);
    }

    return def();
  }

  and<U>(optB: Option<U>): Option<U> {
    if (this.isSome()) {
      return optB;
    }

    return this;
  }

  andThen<U>(optB: (a: T) => Option<U>): Option<U> {
    if (this.isSome()) {
      return optB(this.value!);
    }

    return this;
  }

  or(optB: Option<T>): Option<T> {
    if (this.isNone()) {
      return optB;
    }

    return this;
  }

  orElse(optB: () => Option<T>): Option<T> {
    if (this.isNone()) {
      return optB();
    }

    return this;
  }

  filter(predicate: (a: T) => boolean): Option<T> {
    if (this.isSome() && predicate(this.value!)) {
      return this;
    }

    return None();
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (this.isSome() && other.isSome()) {
      return Some([this.value!, other.unwrap()]);
    }

    return None();
  }

  flatten(this: Option<Option<T>>): Option<T> {
    if (isOption(this.value)) {
      if (this.isSome()) {
        return this.value!;
      }
    }

    if (this.isNone()) {
      return this as None;
    }

    throw new Error(
      "Tried to call Option.flatten on Option<T>, this only works on Option<Option<T>>"
    );
  }

  expect(msg: string): T {
    if (this.isSome()) {
      return this.value!;
    }

    throw new Error(msg);
  }

  is(op: Option<T>): boolean {
    if (this.isSome() && op.isSome() && isEqual(this.value, op.unwrap())) {
      return true;
    }

    if (this.isNone() && op.isNone()) {
      return true;
    }

    return false;
  }

  toString() {
    if (this.isSome()) {
      return `Some(${JSON.stringify(this.value!)})`;
    }

    return "None()";
  }
}

export function isOption<T>(option: unknown): option is Option<T> {
  return option instanceof Option;
}
