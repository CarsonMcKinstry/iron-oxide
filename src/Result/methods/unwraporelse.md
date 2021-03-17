# unwrapOr

`Result.unwrapOr` returns the value contained in an `Ok` and returns the result of calling the provided closure if the result is `Err`.

```typescript
Result<T, E>.unwrapOrElse = (op: (err: E) => T) => T;
```

## Example

```typescript
div(1, 0).unwrapOrElse(() => 0); // => 0
```

