import { Some, None } from "../../Option";
import { Ok, Err } from "../../Result";
import { match } from "../match";
import { isSome, isNone, isErr, isOk } from "../utils";

const identity = <T>(i: T): T => i;

describe("Match.match", () => {
  it("should accept primitives as predicates", () => {
    expect(match(2, [[2, identity]])).toEqual(2);
    expect(match(true, [[true, identity]])).toEqual(true);
    expect(match("foo", [["foo", identity]])).toEqual("foo");
  });

  it("should accept objects as predicates", () => {
    expect(match({ foo: 1 }, [[{ foo: 1 }, identity]])).toEqual({ foo: 1 });
    expect(
      match(
        {
          foo: {
            bar: 1,
          },
        },
        [
          [
            {
              foo: {
                bar: 1,
              },
            },
            identity,
          ],
        ]
      )
    ).toEqual({
      foo: {
        bar: 1,
      },
    });
  });

  it("should accept arrays as predicates", () => {
    expect(match([1, 2, 3], [[[1, 2, 3], identity]])).toEqual([1, 2, 3]);
    expect(match([[1, 2], [3]], [[[[1, 2], [3]], identity]])).toEqual([
      [1, 2],
      [3],
    ]);
  });
  it("should accept a function as a predicate", () => {
    expect(
      match<number, string>(2, [
        [(x) => x % 2 === 0, () => "even"],
        [(x) => x % 2 !== 0, () => "odd"],
      ])
    ).toEqual("even");
  });

  it("should work with Options", () => {
    expect(match(Some(1), [[Some(1).is, identity]])).toEqualOption(Some(1));
    expect(match(None(), [[None().is, identity]])).toEqualOption(None());
    expect(match(Some(1), [[isSome, identity]])).toEqualOption(Some(1));
    expect(match(None(), [[isNone, identity]])).toEqualOption(None());
  });

  it("should work with Results", () => {
    expect(match(Ok(1), [[Ok(1).is, identity]])).toEqualResult(Ok(1));
    expect(match(Err("foo"), [[Err("foo").is, identity]])).toEqualResult(
      Err("foo")
    );
    expect(match(Ok(1), [[isOk, identity]])).toEqualResult(Ok(1));
    expect(match(Err("foo"), [[isErr, identity]])).toEqualResult(Err("foo"));
  });

  it("should throw if no predicate matches the value", () => {
    expect(() => match(1, [])).toThrow();
    expect(() => match(1, [[(n) => n % 2 == 0, identity]])).toThrow();
  });
});
