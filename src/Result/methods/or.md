# or

`Result.or` returns the option, or returns `optionB` if the result is `Err`.

```typescript
Result<T, E>.or = (res: Result<T, E>) => Result<T, E>;
```

## Example

```typescript
div(2, 0)        // => Err(MathError.DivisionByZero)
  .or(div(1, 1)) // => Ok(1)
```

