import { Result } from "../Result";
import { Ok } from "../Ok";
import { Err } from "../Err";

describe("Result", () => {
  test("Result.static.isResult", () => {
    expect(Result.isResult(Ok(1))).toBe(true);
    expect(Result.isResult(Err("err"))).toBe(true);
  });
});
