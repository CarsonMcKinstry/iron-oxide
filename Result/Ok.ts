import { Some, None } from "../Option";
import { Result } from "./Result";

export type Ok<T> = _Ok<T, never>;

export function Ok<T>(value: T): Ok<T> {
  return new _Ok(value);
}

class _Ok<T, E> extends Result<T, E> {
  constructor(private value: T) {
    super();
  }

  isOk() {
    return true;
  }

  isErr() {
    return false;
  }

  ok() {
    return Some(this.value);
  }

  err() {
    return None();
  }

  map<U>(proj: (a: T) => U) {
    return Ok<U>(proj(this.value));
  }

  mapErr() {
    return Ok(this.value);
  }

  and<U>(res: Result<U, E>) {
    return res;
  }

  andThen<U>(op: (a: T) => Result<U, E>) {
    return op(this.value);
  }

  or() {
    return Ok(this.value);
  }

  orElse() {
    return Ok(this.value);
  }

  unwrap() {
    return this.value;
  }

  unwrapOr() {
    return this.value;
  }

  unwrapOrElse() {
    return this.value;
  }
}
