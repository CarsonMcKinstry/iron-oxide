import { Option, Result } from ".";

console.error = jest.fn();

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualOption(a: Option<any>): CustomMatcherResult;
      toEqualResult(a: Result<any, any>): CustomMatcherResult;
    }
  }
}

expect.extend({
  toEqualOption(received: Option<any>, option: Option<any>) {
    return received.is(option)
      ? {
          pass: true,
          message: () => `Expected ${received} not to be ${option.toString()}`,
        }
      : {
          pass: false,
          message: () => `Expected ${received} to be ${option.toString()}`,
        };
  },
  toEqualResult(received: Result<any, any>, result: Result<any, any>) {
    return received.is(result)
      ? {
          pass: true,
          message: () => `Expected ${received} not to be ${result.toString()}`,
        }
      : {
          pass: false,
          message: () => `Expected ${received} to be ${result.toString()}`,
        };
  },
});
