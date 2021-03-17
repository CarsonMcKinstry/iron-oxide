# okOrElse

`Option.okOrElse` transforms the `Option` into a `Result`. If the `Option` is `None` the result of the provided error closure will be used as the error of `Result`.

```typescript
Option<T>.okOr<E> = (err: () => E) => Result<T, E>
```

## Example

```typescript
const cantFindMessage = "Couldn't find Carson..."

find(people, person => person.name === 'Carson')  // => None
    .okOr(() => cantFindMessage)                  // => Err("Couldn't find Carson...")
```

