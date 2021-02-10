import { Some, None } from "../../Option";
import { Ok } from "../Ok";
import { Result } from "../Result";

describe("Result.Ok", () => {
  const ok: Result<number, string> = Ok(1);

  test("Result.isOk", () => {
    expect(ok.isOk()).toBe(true);
  });

  test("Result.isErr", () => {
    expect(ok.isErr()).toBe(false);
  });

  test("Result.ok", () => {
    expect(ok.ok()).toEqual(Some(1));
  });

  test("Result.err", () => {
    expect(ok.err()).toEqual(None());
  });

  test("Result.map", () => {
    expect(ok.map((n) => n + 1)).toEqual(Ok(2));
  });

  test("Result.and", () => {
    expect(ok.and(Ok(2))).toEqual(Ok(2));
  });

  test("Result.andThen", () => {
    expect(ok.andThen((n) => Ok(n + 1))).toEqual(Ok(2));
  });

  test("Result.or", () => {
    expect(ok.or(Ok(2))).toEqual(Ok(1));
  });

  test("Result.orElse", () => {
    expect(ok.orElse(() => Ok(2))).toEqual(Ok(1));
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
    expect(ok.mapErr((e) => e)).toEqual(Ok(1));
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
});
