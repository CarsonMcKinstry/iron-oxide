import { Option } from "../Option";
import { None } from "../None";
import { Some } from "../Some";
import { Ok } from "../../Result";

describe("Option.Some", () => {
  const some: Option<number> = Some(1);

  test("Option.is", () => {
    const scalar: Option<number> = Some(1);
    const arr: Option<number[]> = Some([1]);
    const obj: Option<{ foo: number }> = Some({ foo: 1 });
    const complex: Option<{ foo: number }[]> = Some([{ foo: 1 }]);

    expect(scalar.is(Some(1))).toBe(true);
    expect(arr.is(Some([1]))).toBe(true);
    expect(obj.is(Some({ foo: 1 }))).toBe(true);
    expect(complex.is(Some([{ foo: 1 }]))).toBe(true);
    expect(scalar.is(None())).toBe(false);
  });

  test("Option.isSome", () => {
    expect(some.isSome()).toBe(true);
  });

  test("Option.isNone", () => {
    expect(some.isNone()).toBe(false);
  });

  test("Option.unwrap", () => {
    expect(some.unwrap()).toBe(1);
  });

  test("Option.unwrapOr", () => {
    expect(some.unwrapOr(2)).toBe(1);
  });

  test("Option.unwrapOrElse", () => {
    expect(some.unwrapOrElse(() => 2)).toBe(1);
  });

  test("Option.map", () => {
    expect(some.map((n) => n + 1)).toEqualOption(Some(2));
  });

  test("Option.mapOr", () => {
    expect(some.mapOr(3, (n) => n + 1)).toEqual(2);
  });

  test("Option.mapOrElse", () => {
    expect(
      some.mapOrElse(
        () => 3,
        (n) => n + 1
      )
    ).toEqual(2);
  });

  test("Option.and", () => {
    expect(some.and(Some(2))).toEqualOption(Some(2));
  });

  test("Option.andThen", () => {
    expect(some.andThen((value) => Some(value + 1))).toEqualOption(Some(2));
  });

  test("Option.or", () => {
    expect(some.or(Some(2))).toEqualOption(Some(1));
  });

  test("Option.orElse", () => {
    expect(some.orElse(() => Some(2))).toEqualOption(Some(1));
  });

  test("Some should be chainable", () => {
    expect(
      some
        .map((n) => n + 1)
        .map((n) => n + 1)
        .map((n) => n + 1)
        .unwrap()
    ).toEqual(4);
  });

  test("Option.okOr", () => {
    expect(some.okOr(new Error("missing value"))).toEqualResult(Ok(1));
  });

  test("Option.okOrElse", () => {
    expect(some.okOrElse(() => new Error("missing value"))).toEqualResult(
      Ok(1)
    );
  });

  test("Option.filter", () => {
    expect(some.filter((n) => n % 2 === 0)).toEqualOption(None());
    expect(some.filter((n) => n % 2 !== 0)).toEqualOption(Some(1));
  });

  test("Option.zip", () => {
    expect(some.zip(Some(2))).toEqualOption(Some([1, 2]));
    expect(some.zip(None())).toEqualOption(None());
  });

  test("Option.expect", () => {
    expect(some.expect("")).toEqual(1);
  });

  // test("Option.flatten", () => {
  //   expect(() => some.flatten()).toThrow();

  //   let nestedSome: Option<Option<number>> = Some(some);

  //   expect(nestedSome.flatten()).toEqualOption(some);

  //   nestedSome = Some(None());

  //   expect(nestedSome.flatten()).toEqualOption(None());
  // });

  test("Option.toString", () => {
    expect(some.toString()).toEqual("Some(1)");
  });
});
