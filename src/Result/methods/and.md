# and

`Result.and` returns the supplied `res` if the result is `Ok`, returns `Err<never>` otherwise.

```typescript
Result<T, E>.and<U> = (res: Result<U, E>) => Result<U, E>;
```

## Example

```typescript

div(2, 2)         // => Ok(1)
  .and(div(3, 3)) // => Ok(1)

```

