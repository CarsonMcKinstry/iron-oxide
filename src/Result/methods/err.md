# err

`Result.err` converts `Result<never, E>` into `Option<E>`, `None` if the result is `Ok`.

```typescript
Result<T, E>.err = () => Option<E>;

```

## Example

```typescript

div(2, 2) // => Ok(1)
  .err()  // => None

```
