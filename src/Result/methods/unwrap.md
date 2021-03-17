# unwrap

`Result.unwrap` returns the value contained in an `Ok` and throws if the result is `Err`.

```typescript
Result<T,E>.unwrap = () => T;
```

## Example

```typescript
  div(1, 1).unwrap(); // => 1
```

