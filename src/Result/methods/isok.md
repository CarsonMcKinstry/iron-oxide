# isOk

`Result.isOk` returns whether or not the result is `Ok` 

```typescript
Result<T, E>.isOk(): boolean;
```

## Example

```typescript

div(2, 2).isOk(); // => true

div(2, 0).isOk(); // => false

```
