import { Some, None } from "../../Option";
import { Ok } from "../Ok";
import { Err } from "../Err";
import { Result } from "../Result";
import { result } from "lodash";

describe("Result.Ok", () => {
  const ok: Result<number, string> = Ok(1);

  test("Result.is", () => {
    const scalar: Result<number, string> = Ok(1);
    const arr: Result<number[], string> = Ok([1]);
    const obj: Result<{ foo: number }, string> = Ok({ foo: 1 });
    const complex: Result<{ foo: number }[], string> = Ok([{ foo: 1 }]);

    expect(scalar.is(Ok(1))).toBe(true);
    expect(arr.is(Ok([1]))).toBe(true);
    expect(obj.is(Ok({ foo: 1 }))).toBe(true);
    expect(complex.is(Ok([{ foo: 1 }]))).toBe(true);
    expect(scalar.is(Err("nope"))).toBe(false);
  });
  test("Result.isOk", () => {
    expect(ok.isOk()).toBe(true);
  });

  test("Result.isErr", () => {
    expect(ok.isErr()).toBe(false);
  });

  test("Result.ok", () => {
    expect(ok.ok()).toEqualOption(Some(1));
  });

  test("Result.err", () => {
    expect(ok.err()).toEqualOption(None());
  });

  test("Result.map", () => {
    expect(ok.map((n) => n + 1)).toEqualResult(Ok(2));
  });

  test("Result.and", () => {
    expect(ok.and(Ok(2))).toEqualResult(Ok(2));
  });

  test("Result.andThen", () => {
    expect(ok.andThen((n) => Ok(n + 1))).toEqualResult(Ok(2));
  });

  test("Result.or", () => {
    expect(ok.or(Ok(2))).toEqualResult(Ok(1));
  });

  test("Result.orElse", () => {
    expect(ok.orElse(() => Ok(2))).toEqualResult(Ok(1));
  });

  test("Result.unwrap", () => {
    expect(ok.unwrap()).toEqual(1);
  });

  test("Result.unwrapOr", () => {
    expect(ok.unwrapOr(2)).toEqual(1);
  });

  test("Result.unwrapOrElse", () => {
    expect(ok.unwrapOrElse(() => 2)).toEqual(1);
  });

  test("Result.mapErr", () => {
    expect(ok.mapErr((e) => e)).toEqualResult(Ok(1));
  });

  test("Result.mapOr", () => {
    expect(ok.mapOr(3, (n) => n + 1)).toEqual(2);
  });

  test("Result.mapOrElse", () => {
    expect(
      ok.mapOrElse(
        () => 3,
        (n) => n + 1
      )
    ).toEqual(2);
  });

  test("Result.unwrapErr", () => {
    expect(() => ok.unwrapErr()).toThrow();
  });

  test("Result.expect", () => {
    expect(ok.expect("")).toEqual(1);
  });

  test("Result.expectErr", () => {
    expect(() => ok.expectErr("test")).toThrowError(new Error("test"));
  });

  test("Result.toString", () => {
    expect(ok.toString()).toEqual("Ok(1)");
  });
});
