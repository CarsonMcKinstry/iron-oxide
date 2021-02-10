import { Err } from "../Result";
import { Option } from "./Option";

export class _None<T> extends Option<T> {
  isSome() {
    return false;
  }
  isNone() {
    return true;
  }
  unwrap(): never {
    throw new Error("Called 'Option.unwrap' on a 'None' value");
  }
  unwrapOr<T>(def: T) {
    return def;
  }
  unwrapOrElse<T>(def: () => T) {
    return def();
  }
  map() {
    return None();
  }

  mapOr<T>(def: T) {
    return def;
  }
  mapOrElse<T>(def: () => T) {
    return def();
  }
  and() {
    return None();
  }
  andThen() {
    return None();
  }
  or<T>(optb: Option<T>) {
    return optb;
  }
  orElse<T>(def: () => Option<T>) {
    return def();
  }

  okOr<E>(err: E) {
    return Err(err);
  }

  okOrElse<E>(op: () => E) {
    return Err(op());
  }

  filter() {
    return None();
  }

  zip() {
    return None();
  }

  expect(msg: string): never {
    throw new Error(msg);
  }

  flatten() {
    return None();
  }
}

export type None<T> = _None<T>;

export function None(): None<never> {
  return new _None();
}
