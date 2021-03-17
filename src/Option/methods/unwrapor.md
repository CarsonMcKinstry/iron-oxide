# unwrapOr

`Option.unwrapOr` returns the value contained in a `Some` and returns the provided default if the `Option` is `None`.

```typescript
Option<T>.unwrapOr = (def: T) => T;
```

## Example

```typescript
const carson = find(people, person => person.name === "Carson") // => None
        .unwrapOr({ name: "Carson", age: 27 });                 // => { name: "Carson", age: 27 }
```

