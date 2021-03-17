# zip

`Option.zip` combines two `Option`s into a single `Option` of type `Option<T, U>`

```typescript
Option<T>.zip<U> = (other: Option<U>) => Option<[T, U]>;
```

## Example

```typescript
const tom = find(people, person => person.name === 'Tom'); // => Some({ name: "Tom", age: 28 })
const bob = find(people, person => person.name === 'Bob'); // => Some({ name: "Bob", age: 25 })

tom.zip(bob) // => Some([{ name: "Tom", age: 28 }, { name: "Bob", age: 25 } ]);
```

