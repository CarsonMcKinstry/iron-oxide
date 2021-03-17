# unwrapOrElse

`Option.unwrapOrElse` returns the value contained in a `Some` and returns the result of calling the provided closure if the `Option` is `None`.

```typescript
Option<T>.unwrapOrElse = (def: () => T) => T;
```

## Example

```typescript
const carson = find(people, person => person.name === "Carson") // => None
        .unwrapOrElse(() => { name: "Carson", age: 27 });       // => { name: "Carson", age: 27 }
```

