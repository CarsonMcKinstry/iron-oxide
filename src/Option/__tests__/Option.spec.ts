import { Option } from "../Option";
import { Some } from "../Some";
import { None } from "../None";

describe("Option", () => {
  test("Option", () => {
    expect(Option<number>(1)).toEqualOption(Some(1));
    expect(Option(null)).toEqualOption(None());
    expect(Option()).toEqualOption(None());
  });
});
