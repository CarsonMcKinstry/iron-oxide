# and

`Option.and` returns `None` if the `Option` is `None`, otherwise returns `optionB`.

```typescript
Option<T>.and<U> = (optionB: Option<U>) => Option<U>
```

## Example

```typescript
find(people, person => person.name === 'Tom')   // => Some({ name: "Tom", age: 28 })
    .and(Some({ profession: "Engineer" }))      // => Some({ profession: "Engineer" })
```

