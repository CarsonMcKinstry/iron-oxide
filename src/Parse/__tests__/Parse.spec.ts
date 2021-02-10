import { Parse } from "../index";
import { Ok } from "../../Result";

describe("Parse.json", () => {
  it("should properly parse json", () => {
    const json = Parse.json(`{ "foo": "bar"}`);

    expect(json).toEqualResult(Ok({ foo: "bar" }));
  });

  it("should be of type Err if it cannot parse the JSON", () => {
    expect(Parse.json("").isErr()).toBe(true);
  });

  it("should not throw an error when it cannot parse the JSON", () => {
    expect(() => Parse.json("")).not.toThrow();
  });
});

describe("Parse.int", () => {
  it("should properly parse an int", () => {
    const int = Parse.int("10");

    expect(int).toEqualResult(Ok(10));
  });

  it("should be of type Err if it cannot parse the int", () => {
    expect(Parse.int("").isErr()).toBe(true);
  });

  it("should not throw an error when it cannot parse the int", () => {
    expect(() => Parse.int("")).not.toThrow();
  });
});

describe("Parse.float", () => {
  it("should properly parse a float", () => {
    const float = Parse.float("10.0");

    expect(float).toEqualResult(Ok(10.0));
  });

  it("should be of type Err if it cannot parse the float", () => {
    expect(Parse.float("").isErr()).toBe(true);
  });

  it("should not throw an error when it cannot parse the float", () => {
    expect(() => Parse.float("")).not.toThrow();
  });
});
