import { Some, None } from "../Option";
import { Result } from "./Result";

export type Err<E> = _Err<never, E>;

export function Err<E>(error: E): Err<E> {
  return new _Err(error);
}

class _Err<T, E> extends Result<T, E> {
  constructor(private error: E) {
    super();
  }

  isOk() {
    return false;
  }

  isErr() {
    return true;
  }

  map() {
    return Err(this.error);
  }

  mapErr<F>(proj: (err: E) => F) {
    return Err(proj(this.error));
  }

  ok() {
    return None();
  }

  err() {
    return Some(this.error);
  }

  and() {
    return Err(this.error);
  }

  andThen() {
    return Err(this.error);
  }

  or<T>(res: Result<T, E>) {
    return res;
  }

  orElse<U>(op: (a: E) => Result<T, U>) {
    return op(this.error);
  }

  unwrap(): never {
    console.error(this.error);
    throw new Error("Called 'Result.unwrap' on an 'Err' value");
  }

  unwrapOr<T>(optb: T) {
    return optb;
  }

  unwrapOrElse<T>(op: (err: E) => T) {
    return op(this.error);
  }
}
