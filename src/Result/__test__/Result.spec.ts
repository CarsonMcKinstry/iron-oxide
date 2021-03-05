import { Result } from "../Result";
import { Ok } from "../Ok";
import { Err } from "../Err";

describe("Result", () => {
  test("Result", () => {
    expect(Result(1)).toEqualResult(Ok(1));
    expect(Result(null, "nope")).toEqualResult(Err("nope"));
  });
});
