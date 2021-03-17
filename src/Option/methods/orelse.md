# orElse

`Option.orElse` returns the option, or returns `optionB` returned by the given closure if the `Option` is `None`.

```typescript
Option<T>.orElse = (f: () => Option<T>) => Option<T>;
```

## Example

```typescript
const carson = find(people, person => person.name === 'Carson'); // => None

carson.orElse(() => find(people,person => person.name === 'Tom')) // => Some({ name: "Tom", age: 28 })
```

