# mapOrElse

`Option.mapOr` transforms the contained value and returns it, returning the value returned by the provided closure if the `Option` is `None`.

```typescript
Option<T>.mapOrElse<U> = (def: () => U, proj: (value: T) => U) => U;
```

## Example

```typescript
const defaultName = "Carson";

find(people, person => person.name === 'Carson')    // => None
    .mapOrElse(() => defaultName, person => person.name)  // => "Carson"
```

