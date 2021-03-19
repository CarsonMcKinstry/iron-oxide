import { Some, None } from "../../Option";
import { Ok, Err } from "../../Result";
import { match } from "../match";
import { isSome, isNone, isErr, isOk, fallthrough } from "../utils";

const identity = <T>(i: T): T => i;

describe("Match.match", () => {
  it("should accept primitives as predicates", () => {
    expect(match(2, [[2, identity]])).toEqual(2);
    expect(match(true, [[true, identity]])).toEqual(true);
    expect(match("foo", [["foo", identity]])).toEqual("foo");
  });

  it("should work with a fallthrough ", () => {
    expect(match(2, [[fallthrough, identity]])).toEqual(2);
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
    expect(match(Some(1), [[Some(1), identity]])).toEqual(Some(1));
    expect(match(None(), [[None(), identity]])).toEqual(None());
    expect(match(Some(1), [[isSome, identity]])).toEqual(Some(1));
    expect(match(None(), [[isNone, identity]])).toEqual(None());
  });

  it("should work with Results", () => {
    expect(match(Ok(1), [[Ok(1), identity]])).toEqual(Ok(1));
    expect(match(Err("foo"), [[Err("foo"), identity]])).toEqual(Err("foo"));
    expect(match(Ok(1), [[isOk, identity]])).toEqual(Ok(1));
    expect(match(Err("foo"), [[isErr, identity]])).toEqual(Err("foo"));
  });

  it("should throw if no predicate matches the value", () => {
    expect(() => match(1, [])).toThrow();
    expect(() => match(1, [[(n) => n % 2 == 0, identity]])).toThrow();
  });
});
