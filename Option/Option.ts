import { Result } from "../Result";

export abstract class Option<T> {
  abstract isSome(): boolean;
  abstract isNone(): boolean;
  abstract unwrap(): T;
  abstract unwrapOr(def: T): T;
  abstract unwrapOrElse(f: () => T): T;
  abstract map<U>(proj: (a: T) => U): Option<U>;
  abstract mapOr<U>(def: U, proj: (a: T) => U): U;
  abstract mapOrElse<U>(def: () => U, proj: (a: T) => U): U;
  abstract okOr<E>(err: E): Result<T, E>;
  abstract okOrElse<E>(err: () => E): Result<T, E>;
  abstract and<U>(optb: Option<U>): Option<U>;
  abstract andThen<U>(f: (a: T) => Option<U>): Option<U>;
  abstract or(optb: Option<T>): Option<T>;
  abstract orElse(f: () => Option<T>): Option<T>;
  abstract filter(predicate: (a: T) => boolean): Option<T>;
  abstract zip<U>(other: Option<U>): Option<[T, U]>;
  abstract expect(msg: string): T;

  abstract flatten(): Option<T>;

  static isOption<T>(value: any): value is Option<T> {
    return value instanceof Option;
  }
}

/**
 * Methods to add:
 *
 * transpose
 * replace // may not be possible...
 */
