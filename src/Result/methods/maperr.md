# mapErr

`Result.mapErr` transforms the contained error using the provided projection.

```typescript
Result<T, E>.mapErr = <F>(op: (err: E) => F) => Result<T, F>;
```

## Example

```typescript

div(2, 0).mapErr<string>(err => {
  if (err === MathError.DivisionByZero) {
    return 'You tried to divide by zero. That doesn\'t work'
  }

  return err;
}); // Err('You tried to divide by zero. That doesn\'t work')

```
