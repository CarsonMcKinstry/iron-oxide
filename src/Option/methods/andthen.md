# andThen

`Option.andThen` returns `None` if the `Option` is `None`, otherwise returns the option contained within the provided closure.

```typescript
Option<T>.andThen<U> = (f: (value: T) => Option<U>) => Option<U>;
```

## Example

```typescript
find(people, person => person.name === 'Tom')     // => Some({ name: "Tom", age: 28 })
    .and(() => Some({ profession: "Engineer" }))  // => Some({ profession: "Engineer")
```

