# ok

`Result.ok` converts `Result<T, never>` into `Option<T>`, `None` if the result is `Err`.

```typescript
Result<T, E>.ok = () => Option<T>;

```

## Example

```typescript

div(2, 2) // => Ok(1)
  .ok()   // => Some(1)

```
