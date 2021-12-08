import { Result } from "../Result";
import { Err } from "../Err";
import { Ok } from "../Ok";
import { None, Some } from "../../Option";

describe("Result: Err", () => {
  const err: Result<number, string> = Err("Nope");
  test("Result.isOk", () => {
    expect(err.isOk()).toBe(false);
  });

  test("Result.isErr", () => {
    expect(err.isErr()).toBe(true);
  });

  test("Result.ok", () => {
    expect(err.ok()).toStrictEqual(None());
  });

  test("Result.err", () => {
    expect(err.err()).toEqual(Some("Nope"));
  });

  test("Result.map", () => {
    expect(err.map((n) => n + 1)).toEqual(Err("Nope"));
  });

  test("Result.and", () => {
    expect(err.and(Ok(2))).toEqual(Err("Nope"));
  });

  test("Result.andThen", () => {
    expect(err.andThen((n) => Ok(n + 1))).toEqual(Err("Nope"));
  });

  test("Result.or", () => {
    expect(err.or(Ok(2))).toEqual(Ok(2));
  });
  test("Result.orElse", () => {
    expect(err.orElse(() => Ok(2))).toEqual(Ok(2));
  });

  test("Result.unwrap", () => {
    expect(() => err.unwrap()).toThrow();
  });

  test("Result.unwrapOr", () => {
    expect(err.unwrapOr(1)).toEqual(1);
  });

  test("Result.unwrapOrElse", () => {
    expect(err.unwrapOrElse((_) => 1)).toEqual(1);
  });

  test("Result.mapErr", () => {
    expect(err.mapErr((err) => err + "...")).toEqual(Err("Nope..."));
  });

  test("Result.mapOr", () => {
    expect(err.mapOr(2, (e) => e)).toEqual(2);
  });

  test("Result.mapOrElse", () => {
    expect(
      err.mapOrElse(
        () => 2,
        (e) => e
      )
    ).toEqual(2);
  });

  test("Result.unwrapErr", () => {
    expect(err.unwrapErr()).toEqual("Nope");
  });

  test("Result.expectErr", () => {
    expect(err.expectErr("")).toEqual("Nope");
  });

  test("Result.expect", () => {
    expect(() => err.expect("test")).toThrowError(new Error("test"));
  });

  test("Result.toString", () => {
    expect(err.toString()).toEqual('Err("Nope")');
  });
});
