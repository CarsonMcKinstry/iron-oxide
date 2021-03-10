import { isOption, Option } from "./Option";

export type None = Option<any>;

export function None(): None {
  return new Option();
}

export function isNone(option: unknown): option is None {
  return isOption(option) && option.isNone();
}
