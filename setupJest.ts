import { Option, Result } from ".";

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
    return received.eq(option)
      ? {
          pass: true,
          message: () => "",
        }
      : {
          pass: false,
          message: () => "",
        };
  },
  toEqualResult(received: Result<any, any>, result: Result<any, any>) {
    return received.eq(result)
      ? {
          pass: true,
          message: () => "",
        }
      : {
          pass: false,
          message: () => "",
        };
  },
});
