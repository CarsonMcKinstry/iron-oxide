import { Ok } from "../Result";
import { Option } from "./Option";
import { None } from "./None";

export class _Some<T> extends Option<T> {
  constructor(private value: T) {
    super();
  }
  isSome() {
    return true;
  }
  isNone() {
    return false;
  }
  unwrap() {
    return this.value;
  }
  unwrapOr(_: T) {
    return this.value;
  }
  unwrapOrElse(_: () => T) {
    return this.value;
  }
  map<U>(proj: (a: T) => U) {
    return Some(proj(this.value));
  }
  mapOr<U>(_: U, proj: (a: T) => U) {
    return proj(this.value);
  }
  mapOrElse<U>(_: () => U, proj: (a: T) => U) {
    return proj(this.value);
  }
  and<U>(optb: Option<U>) {
    return optb;
  }
  andThen<U>(next: (a: T) => Option<U>) {
    return next(this.value);
  }
  or(_: Option<T>) {
    return Some(this.value);
  }
  orElse(_: () => Option<T>) {
    return Some(this.value);
  }

  okOr() {
    return Ok(this.value);
  }

  okOrElse() {
    return Ok(this.value);
  }

  filter(predicate: (value: T) => boolean) {
    return predicate(this.value) ? Some(this.value) : None();
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (other.isNone()) {
      return None();
    }

    const t = this.unwrap();
    const u = other.unwrap();

    return Some([t, u]);
  }

  expect() {
    return this.value;
  }

  flatten() {
    if (Option.isOption<T>(this.value)) {
      return this.value;
    }

    throw new Error(
      "Flatten can only be used on values of type `Option<Option<T>>`"
    );
  }
}

export type Some<T> = _Some<T>;

export function Some<T>(value: T): Some<T> {
  return new _Some(value);
}
