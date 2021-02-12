import { Option } from "../Option";
import { Some } from "../Some";
import { None } from "../None";

describe("Option", () => {
  test("Option.isOption", () => {
    expect(Option.isOption(Some(1))).toBe(true);
    expect(Option.isOption(None())).toBe(true);
  });

  test("Option.from", () => {
    expect(Option.from<number>(1)).toEqualOption(Some(1));
    expect(Option.from(null)).toEqualOption(None());
    expect(Option.from()).toEqualOption(None());
  });
});
