# unwrapOr

`Result.unwrapOr` returns the value contained in an `Ok` and returns the provided default if the result is `Err`.

```typescript
Result<T, E>.unwrapOr = (optb: T) => T;
```

## Example

```typescript
div(1, 0).unwrapOr(0); // => 0
```

