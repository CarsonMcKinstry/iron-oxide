# okOr

`Option.okOr` transforms the `Option` into a `Result`. If the `Option` is `None` the provided error will be used as the error of `Result`.

```typescript
Option<T>.okOr<E> = (err: E) => Result<T, E>;
```

## Example

```typescript
find(people, person => person.name === 'Carson')   // => None
    .okOr("Couldn't find Carson...")               // => Err("Couldn't find Carson...")
```

