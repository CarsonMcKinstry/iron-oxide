import { isResult } from "../Result";
import { Ok, isOk } from "../Ok";
import { Err, isErr } from "../Err";

describe("Result utils", () => {
  test("isResult", () => {
    expect(isResult(Ok(1))).toBe(true);
    expect(isResult(Err("err"))).toBe(true);
  });

  test("isOk", () => {
    expect(isOk(Ok(1))).toBe(true);
    expect(isOk(Err("err"))).toBe(false);
  });
  test("isErr", () => {
    expect(isErr(Ok(1))).toBe(false);
    expect(isErr(Err("err"))).toBe(true);
  });
});
