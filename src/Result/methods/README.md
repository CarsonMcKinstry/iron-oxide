# Methods

`Result` comes with some built-in methods for interacting with the wrapped value and handling what happens when the `Result` is `Err`.

### Interacting with the value

From our introductory example, we have our `parseInt` function with the signature

```typescript
function parseInt(str: string, radix?: number): Result<number, string>;
```

Commonly, we use the `map` method to transform the value.

```typescript

const numTimesTwo = parseInt("2")
    .map(n => n * 2)

```

Here, `parseInt` returns `Ok(2)`, which can then be `map`ped as we see fit. In JavaScript, if this were to fail, it would result in `NaN`, or `not a number`, meaning we would need to work with `isNaN` in order to guard against the failure. Here, though, that's been taken care of for us inside of `parseInt` and it will return a nice error message, as an `Err` containing information about _why_ the parsing failed. How do we then work with this error?

### Interacting with the error

`Result` also comes with some methods for working with the error we receive. Most notably, errors can be mapped with `mapErr`. 

```typescript
const erroredParse = parseInt("foo")
    .mapErr(errorMessage => {
        return "Oops, we couldn't parse that value!"
    })
```

This can become very useful when we have much more complex return types

```typescript

enum MathError {
    DivisionByZero,
    NonPositiveLogarithm,
    NegativeSquareRoot
}

type MathResult = Result<number, MathError>;

function div(x: number, y: number): MathResult {
    if (y === 0) {
        return Err(MathError.DivisionByZero);
    } else {
        return Ok(x / y);
    }
}

function ln(x: number): MathResult {
    if (x < 0) {
        return Err(MathError.NonPositiveLogarithm);
    } else {
        return Ok(Math.log10(x))
    }
}

function sqrt(x: number): MathResult {
    if (x < 0) {
        return Err(MathError.NegativeSquareRoot);
    } else {
        return Ok(Math.sqrt(x));
    }
}

```

In each of these instances, our error could be one of the enum `MathError`. This means we can tailor how we handle the error accordingly.

```typescript

div(1, 0)
    .mapErr(err => {
        if (err === MathError.DivisionByZero) {
            throw new Error("You attempted to divide by zero!")
        }
    });

ln(-1)
    .mapErr(err => {
        if (err === MathError.NonPositiveLogarithm) {
            throw new Error("Natural log is not defined for values less than 0");
        }
    });

sqrt(-1)
    .mapErr(err => {
        if (err === MathError.NegativeSquareRoot) {
            throw new Error("The square root of a negative number is imaginary" )
        }
    })
```

<!-- 
  map<U>(proj: (a: T) => U): Result<U, E>;
  mapErr<F>(op: (err: E) => F): Result<T, F>;
  mapOr<U>(def: U, proj: (a: T) => U): U;
  mapOrElse<U>(def: () => U, proj: (a: T) => U): U;
  isOk(): boolean;
  isErr(): boolean;
  ok(): Option<T>;
  err(): Option<E>;
  and<U>(res: Result<U, E>): Result<U, E>;
  andThen<U>(op: (a: T) => Result<U, E>): Result<U, E>;
  or(res: Result<T, E>): Result<T, E>;
  orElse<F>(op: (a: E) => Result<T, F>): Result<T, F>;
  unwrap(): T;
  unwrapErr(): E;
  unwrapOr(optb: T): T;
  unwrapOrElse(op: (err: E) => T): T;
  expect(msg: string): T;
  expectErr(msg: string): E;
  is(res: Result<T, E>): boolean;
  -->