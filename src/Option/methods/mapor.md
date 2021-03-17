# mapOr

`Option.mapOr` transforms the contained value and returns it, returning the default value if the `Option` is `None`.

```typescript
Option<T>.mapOr<U> = (def: U, proj: (value: T) => U) => U;
```

## Example

```typescript
find(people, person => person.name === 'Carson') // => None
    .mapOr("Carson", person => person.name)        // => "Carson"
```

