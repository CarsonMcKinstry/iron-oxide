# isNone

`Option.isNone` returns whether or not the `Option` is `None`.

```typescript
Option<T>.isNone = () => boolean;
```

## Example

```typescript
const carson = find(people, person => person.name === "Carson")

if (carson.isNone()) {
    console.log("We didn't find Carson");
} else {
    console.log("We found Carson");
}
```

