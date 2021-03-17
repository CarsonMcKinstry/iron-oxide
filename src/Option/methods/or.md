# or

`Option.or` returns the option, or returns `optionB` if the `Option` is `None`.

```typescript
Option<T>.or = (optionB: Option<T>) => Option<T>;
```

## Example

```typescript
const carson = find(people, person => person.name === 'Carson'); // => None

carson.or(find(people,person => person.name === 'Tom')) // => Some({ name: "Tom", age: 28 })
```

