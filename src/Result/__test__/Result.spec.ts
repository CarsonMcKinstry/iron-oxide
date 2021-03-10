import { Result } from "../Result";
import { Ok } from "../Ok";
import { Err } from "../Err";

describe("Result", () => {
  test("Result", () => {
    expect(new Result(1)).toEqual(Ok(1));
    expect(new Result(null, "nope")).toEqual(Err("nope"));
  });
});
