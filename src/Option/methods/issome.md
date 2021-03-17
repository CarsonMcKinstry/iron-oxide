# isSome

`Option.isSome` returns whether or not the `Option` is a `Some`.

```typescript
Option<T>.isSome = () => boolean;
```

## Example

```typescript
const carson = find(people, person => person.name === "Carson")

if (carson.isSome()) {
    console.log("We found Carson");
} else {
    console.log("We didn't find Carson");
}
```

