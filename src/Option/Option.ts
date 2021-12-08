import { Err, Ok, Result } from "../Result";
import { None } from "./None";
import { Some } from "./Some";

const valueSymbol = Symbol("value");

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
  filter<U extends T>(predicate: (a: T) => a is U): Option<U>;
  filter(predicate: (a: T) => boolean): Option<T>;
  zip<U>(other: Option<U>): Option<[T, U]>;
  expect(msg: string): T;
  flatten(): Option<T>;
  toString(): string;
}

export class Option<T> implements Option<T> {
  private [valueSymbol]?: T = undefined;

  constructor(value?: T) {
    if (value != undefined) {
      this[valueSymbol] = value;
    }
  }

  // is Some if vale is not undefined or null
  isSome(): this is Some<T> {
    return this[valueSymbol] != undefined;
  }

  // is None if value is undefined or null
  isNone(): this is None {
    return this[valueSymbol] == undefined;
  }

  okOr<E>(error: E): Result<T, E> {
    if (this.isSome()) {
      return Ok(this[valueSymbol]!);
    }

    return Err(error);
  }

  okOrElse<E>(error: () => E): Result<T, E> {
    if (this.isSome()) {
      return Ok(this[valueSymbol]!);
    }

    return Err(error());
  }

  unwrap(): T {
    if (this.isSome()) {
      return this[valueSymbol]!;
    }

    throw new Error("Called 'Option.unwrap' on a 'None' value");
  }

  unwrapOr<U>(def: U): T | U {
    if (this.isSome()) {
      return this[valueSymbol]!;
    }

    return def;
  }

  unwrapOrElse<U>(def: () => U): T | U {
    if (this.isSome()) {
      return this[valueSymbol]!;
    }

    return def();
  }

  map<U>(proj: (a: T) => U): Option<U> {
    if (this.isSome()) {
      return Some(proj(this[valueSymbol]!));
    }

    return this;
  }

  mapOr<U>(def: U, proj: (a: T) => U): U {
    if (this.isSome()) {
      return proj(this[valueSymbol]!);
    }

    return def;
  }

  mapOrElse<U>(def: () => U, proj: (a: T) => U): U {
    if (this.isSome()) {
      return proj(this[valueSymbol]!);
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
      return optB(this[valueSymbol]!);
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

  filter<U extends T>(predicate: (a: T) => a is U): Option<U> {
    if (this.isSome() && predicate(this[valueSymbol]!)) {
      return this as unknown as Option<U>;
    }

    return None();
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (this.isSome() && other.isSome()) {
      return Some([this[valueSymbol]!, other.unwrap()]);
    }

    return None();
  }

  flatten(this: Option<Option<T>>): Option<T> {
    if (isOption(this[valueSymbol])) {
      if (this.isSome()) {
        return this[valueSymbol]!;
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
      return this[valueSymbol]!;
    }

    throw new Error(msg);
  }

  toString() {
    if (this.isSome()) {
      return `Some(${JSON.stringify(this[valueSymbol]!)})`;
    }

    return "None()";
  }
}

export function isOption<T>(option: unknown): option is Option<T> {
  return option instanceof Option;
}
