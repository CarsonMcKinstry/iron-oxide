# expectErr

`Result.expectErr` returns the contained error, throwing the provided message if the result is `Ok`.

```typescript
Result<T, E>.expectErr = (msg: string) => E;
```

## Example

```typescript

div(2, 0)                                         // => Ok(1)
  .expectErr("Something went wrong while dividing")  // => Some("Somethign went wrong while dividing")

```
