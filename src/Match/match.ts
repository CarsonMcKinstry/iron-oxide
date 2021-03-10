import { isOption, Option } from "../Option";
import { isResult, Result } from "../Result";
import isEqual from "lodash.isequal";
import isFunction from "lodash.isfunction";

type MatchStatement<T, R = void> = [
  T | ((value: T) => boolean),
  (value: T) => R
];

type OptionMatchStatement<T, R = void> = [
  Option<T> | ((option: Option<T>) => boolean),
  (value: T) => R
];

type ResultMatchStatement<T, E, R = void> =
  | [Result<T, E> | ((result: Result<T, E>) => boolean), (value: T) => R]
  | [Result<T, E> | ((result: Result<T, E>) => boolean), (error: E) => R];

export function match<T, E, R = void>(
  result: Result<T, E>,
  statements: ResultMatchStatement<T, E, R>[]
): R;
export function match<T, R = void>(
  option: Option<T>,
  statements: OptionMatchStatement<T, R>[]
): R;
export function match<T, R = void>(
  value: T,
  statements: MatchStatement<T, R>[]
): R;
export function match<T, E, R = void>(value: any, statements: any[]): any {
  for (const [predicate, handler] of statements) {
    // if the predicate is a function
    if (isFunction(predicate)) {
      // if it is an option
      if (isOption(value)) {
        if (value.isSome()) {
          return value.map(handler).unwrap();
        } else {
          return handler();
        }
      }
      // if it is a result

      if (isResult(value)) {
        if (value.isOk()) {
          return value.map<R>(handler).unwrap();
        }

        return (value as Result<T, E>).mapErr<R>(handler).unwrapErr();
      }

      // defaults to checking the predicate with the value
      if (predicate(value)) {
        return handler(value);
      }
    }

    // if the predicate is a value
    if (isEqual(value, predicate)) {
      // if it is an option
      if (isOption(value)) {
        if (value.isSome()) {
          return value.map(handler).unwrap();
        } else {
          return handler();
        }
      }

      // if it is a result
      if (isResult(value)) {
        if (value.isOk()) {
          return value.map<R>(handler).unwrap();
        }

        return (value as Result<T, E>).mapErr<R>(handler).unwrapErr();
      }

      // defaults to just handing the value to the handler
      return handler(value);
    }
  }

  throw new Error(`No predicate matched the given value`);
}
