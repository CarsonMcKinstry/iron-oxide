# mapOrElse

`Result.mapOr` transforms the contained value and returns it, returning the value returned by the provided closure if the result is `Err`.

```typescript
Result<T,E>.mapOrElse = <U>(def: () => U, proj: (a: T) => U) => U;
```

## Example

```typescript
div(2, 0).mapOr(() => 0, n => n * 2) // Ok(0)
```

