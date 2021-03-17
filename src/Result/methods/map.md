# map

`Result.map` transforms the contained value using the provided projection.

```typescript
Result<T, E>.map = <U>(proj: (a: T) => U) => Result<U, E>;
```

## Example

```typescript

div(2, 2).map(n => n * 2); // Ok(2)

```
