import { isOption, Option } from "./Option";

export type Some<T> = Option<T>;

export function Some<T>(value: T): Some<T> {
  return new Option(value);
}

export function isSome<T>(option: unknown): option is Some<T> {
  return isOption(option) && option.isSome();
}
