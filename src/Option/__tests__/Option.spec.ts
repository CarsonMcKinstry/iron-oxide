import { Option } from "../Option";
import { Some } from "../Some";
import { None } from "../None";

describe("Option", () => {
  test("Option.static.isOption", () => {
    expect(Option.isOption(Some(1))).toBe(true);
    expect(Option.isOption(None())).toBe(true);
  });
});
