# unwrapErr

`Result.unwrapErr` returns the error contained in an `Err` and throws if the result is `Ok`.

```typescript
Result<T,E>.unwrapErr = () => E;
```

## Example

```typescript
  div(1, 0).unwrap(); // => MathError.DivisionByZero
```

