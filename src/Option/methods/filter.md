# filter

`Option.filter` returns the `Some` if the contained value satisfies the predicated, returning `None` otherwise.

```typescript
Option<T>.filter = (predicate: (value: T) => boolean) => Option<T>;
```

## Example

```typescript
find(people, person => person.name === 'Tom')    // => Some({ name: "Tom", age: 28 })
    .filter(person => person.name === 'Carson')  // => None
```

