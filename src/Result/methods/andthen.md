# andThen

`Result.andThen` returns the result of the supplied `res` closure if the result is `Ok`, returns `Err<never>` otherwise.

```typescript
Result<T, E>.andThen<U> = (op: (a: T) => Result<U, E>): Result<U, E>;
```

## Example

```typescript

div(2, 2)                   // => Ok(1)
  .andThen(() => div(3, 3)) // => Ok(1)

```

S