# expect

`Result.expect` returns the contained value, throwing the provided message if the result is `Err`.

```typescript
Result<T, E>.expect = (msg: string) => T;
```

## Example

```typescript

div(2, 0)                                         // => Ok(1)
  .expect("Something went wrong while dividing")  // => None

```
