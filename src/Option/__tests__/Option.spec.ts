import { Option } from "../Option";
import { Some } from "../Some";
import { None } from "../None";

describe("Option", () => {
  test("Option", () => {
    expect(new Option<number>(1)).toEqual(Some(1));
    expect(new Option(null)).toStrictEqual(None());
    expect(new Option()).toStrictEqual(None());
  });
});
