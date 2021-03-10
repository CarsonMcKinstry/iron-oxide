import { isEqual, isFunction } from "lodash";

type MatchStatement<T, R = T> = [T | ((value: T) => boolean), (value: T) => R];

export const match = <T, R = T>(
  value: T,
  statements: MatchStatement<T, R>[]
) => {
  for (const [predicate, func] of statements) {
    if (isFunction(predicate)) {
      if (predicate.bind(predicate)(value)) {
        return func(value);
      }
    }

    if (isEqual(predicate, value)) {
      return func(value);
    }
  }

  throw new Error(`No predicate matched the value "${value}"`);
};
