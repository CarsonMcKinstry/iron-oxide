import { Option } from "../Option";
import { None } from "../None";
import { Some } from "../Some";
import { Err } from "../../Result";

describe("Option.None", () => {
  const none: Option<number> = None();

  test("Option.eq", () => {
    expect(none.eq(None())).toBe(true);
    expect(none.eq(Some(1))).toBe(false);
  });
  test("Option.isSome", () => {
    expect(none.isSome()).toBe(false);
  });

  test("Option.isNone", () => {
    expect(none.isNone()).toBe(true);
  });

  test("Option.unwrap", () => {
    expect(() => none.unwrap()).toThrow();
  });

  test("Option.unwrapOr", () => {
    expect(none.unwrapOr(2)).toBe(2);
  });

  test("Option.unwrapOrElse", () => {
    expect(none.unwrapOrElse(() => 2)).toBe(2);
  });

  test("Option.map", () => {
    expect(none.map((n) => n + 1)).toEqualOption(None());
  });

  test("Option.mapOr", () => {
    expect(none.mapOr(3, (n) => n + 1)).toEqual(3);
  });

  test("Option.mapOrElse", () => {
    expect(
      none.mapOrElse(
        () => 3,
        (n) => n + 1
      )
    ).toEqual(3);
  });

  test("Option.and", () => {
    expect(none.and(Some(2))).toEqualOption(None());
  });

  test("Option.andThen", () => {
    expect(none.andThen((value) => Some(2))).toEqualOption(None());
  });

  test("Option.or", () => {
    expect(none.or(Some(2))).toEqualOption(Some(2));
  });

  test("Option.orElse", () => {
    expect(none.orElse(() => Some(2))).toEqualOption(Some(2));
  });

  test("None should be chainable", () => {
    expect(
      none
        .map((n) => n + 1)
        .map((n) => n + 1)
        .map((n) => n + 1)
    ).toEqualOption(None());
  });

  test("Option.okOr", () => {
    const error = new Error("Missing Value");
    expect(none.okOr(error)).toEqualResult(Err(error));
  });

  test("Option.okOrElse", () => {
    const error = new Error("Missing Value");
    expect(none.okOrElse(() => error)).toEqualResult(Err(error));
  });

  test("Option.filter", () => {
    expect(none.filter((n) => n % 2 === 0)).toEqualOption(None());
    expect(none.filter((n) => n % 2 !== 0)).toEqualOption(None());
  });

  test("Option.zip", () => {
    expect(none.zip(Some(2))).toEqualOption(None());
  });

  test("Option.expect", () => {
    expect(() => none.expect("expected a value")).toThrowError(
      new Error("expected a value")
    );
  });
  test("Option.flatten", () => {
    expect(none.flatten()).toEqualOption(None());
  });
});