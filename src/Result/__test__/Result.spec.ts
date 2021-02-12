import { Result } from "../Result";
import { Ok } from "../Ok";
import { Err } from "../Err";

describe("Result", () => {
  test("Result.isResult", () => {
    expect(Result.isResult(Ok(1))).toBe(true);
    expect(Result.isResult(Err("err"))).toBe(true);
  });

  test("Result.from", () => {
    expect(Result.from(1)).toEqualResult(Ok(1));
    expect(Result.from(null, "nope")).toEqualResult(Err("nope"));
  });
});
