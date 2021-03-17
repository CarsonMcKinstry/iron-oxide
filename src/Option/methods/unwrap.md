# unwrap

`Option.unwrap` returns the value contained in a `Some` and throws if the `Option` is `None`.

```typescript
Option<T>.unwrap = () => T;
```

## Example

```typescript
const carson = find(people, person => person.name === "Carson");

try {
    carson.unwrap();
} catch (err) {
    console.error(err);
}
```

