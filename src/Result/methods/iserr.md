# isErr

`Result.isErr` returns whether or not the result is `Err` 

```typescript
Result<T, E>.isErr(): boolean;
```

## Example

```typescript

div(2, 2).isErr(); // => false

div(2, 0).isErr(); // => true

```
