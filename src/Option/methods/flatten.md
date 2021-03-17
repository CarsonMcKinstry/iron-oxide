# Option.flatten

`Option.flatten` converts `Option<Option<T>>` to `Option<T>`

```typescript

Option<Option<T>>.flatten = () => Option<T>;

```

### Example

```typescript

const tom = Some(find(people, person => person.name === 'Tom')); // => Some(Some({ name: "Tom", age: 28 }))

tom.flatten(); // => Some({ name: "Tom", age: 28 })
```

