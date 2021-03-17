# orElse

`Result.orElse` returns the option, or returns the result of the `optionB` closure if the result is `Err`.

```typescript
Result<T, E>.orElse<F> = (op: (a: E) => Result<T, F>) => Result<T, F>;
```

## Example

```typescript
div(2, 0)                  // => Err(MathError.DivisionByZero)
  .orElse(() => div(1, 1)) // => Ok(1)
```

