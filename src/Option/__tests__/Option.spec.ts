import { Option } from "../Option";
import { Some } from "../Some";
import { None } from "../None";

describe("Option", () => {
  test("Option", () => {
    expect(new Option<number>(1)).toEqualOption(Some(1));
    expect(new Option(null)).toEqualOption(None());
    expect(new Option()).toEqualOption(None());
  });
});
