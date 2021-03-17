# map

`Option.map` transforms the contained value of the option using the provided projection.

```typescript
Option<T>.map<U> = (proj: (value: T) => U) => Option<U>;
```

## Example

```typescript
find(people, person => person.name === 'Tom')   // => Some({ name: "Tom", age: 28 })
    .map(person => person.name)                 // => Some("Tom")
```

