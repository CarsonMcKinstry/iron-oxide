import { Some, isSome } from "../Some";
import { None, isNone } from "../None";
import { isOption } from "../Option";

describe("Option utils", () => {
  test("isOption", () => {
    expect(isOption(Some(1))).toBe(true);
    expect(isOption(None())).toBe(true);
  });
  test("isSome", () => {
    expect(isSome(Some(1))).toBe(true);
    expect(isSome(None())).toBe(false);
  });
  test("isNone", () => {
    expect(isNone(Some(1))).toBe(false);
    expect(isNone(None())).toBe(true);
  });
});
