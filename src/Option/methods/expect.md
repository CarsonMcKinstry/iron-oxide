# expect

`Option.expect` returns the wrapped value, or throws an error with the provided message

```typescript
Option<T>.expect = (message: string) => T;
```

## Example

```typescript
find(people, person => person.name === 'Carson') // => None
    .expect("Couldn't find Carson!")             // => throws!
```

