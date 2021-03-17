import { None, Option, Some } from "../Option";
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
  toString(): string;
}

export class Result<T, E> implements Result<T, E> {
  private value?: T = undefined;
  private error?: E = undefined;

  constructor(value?: T, error?: E) {
    if (value != undefined) {
      this.value = value;
    }

    if (error != undefined) {
      this.error = error;
    }
  }

  isOk(): this is Ok<T> {
    return this.value != undefined;
  }

  isErr(): this is Err<E> {
    return this.error != undefined;
  }

  ok(): Option<T> {
    if (this.isOk()) {
      return Some(this.value!);
    }

    return None();
  }

  err(): Option<E> {
    if (this.isErr()) {
      return Some(this.error!);
    }

    return None();
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.value!;
    }

    throw new Error(
      `Called 'Result.unwrap' on an 'Err' with error: ${(this as Err<E>)
        .error!}`
    );
  }

  unwrapErr(): E {
    if (this.isErr()) {
      return this.error!;
    }

    throw new Error(
      `Called 'Result.unwrapErr' on an 'Ok' with value: ${(this as Ok<T>)
        .value!}`
    );
  }

  unwrapOr(optb: T): T {
    if (this.isOk()) {
      return this.value!;
    }

    return optb;
  }

  unwrapOrElse(op: (err: E) => T): T {
    if (this.isOk()) {
      return this.value!;
    }

    return op((this as Err<E>).error!);
  }

  map<U>(proj: (a: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Ok(proj(this.value!));
    }

    return this;
  }

  mapErr<F>(proj: (err: E) => F): Result<T, F> {
    if (this.isErr()) {
      return Err(proj(this.error!));
    }

    return this;
  }

  mapOr<U>(def: U, proj: (a: T) => U): U {
    if (this.isOk()) {
      return proj(this.value!);
    }

    return def;
  }
  mapOrElse<U>(def: () => U, proj: (a: T) => U): U {
    if (this.isOk()) {
      return proj(this.value!);
    }

    return def();
  }

  and<U>(res: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return res;
    }

    return this;
  }

  andThen<U>(op: (a: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return op(this.value!);
    }

    return this;
  }

  or(res: Result<T, E>): Result<T, E> {
    if (this.isErr()) {
      return res;
    }

    return this;
  }
  orElse<F>(op: (a: E) => Result<T, F>): Result<T, F> {
    if (this.isErr()) {
      return op(this.error!);
    }

    return this;
  }

  expect(msg: string): T {
    if (this.isOk()) {
      return this.value!;
    }

    throw new Error(msg);
  }
  expectErr(msg: string): E {
    if (this.isErr()) {
      return this.error!;
    }

    throw new Error(msg);
  }

  toString(): string {
    if (this.isOk()) {
      return `Ok(${JSON.stringify(this.value)})`;
    }

    return `Err(${JSON.stringify((this as Err<E>).error)})`;
  }
}

export function isResult<T, E>(result: unknown): result is Result<T, E> {
  return result instanceof Result;
}
