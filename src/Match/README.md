# Using match

`iron-oxide` offers a rudimentary way to mimic `rust`'s `match` keyword. In `rust` the `match` keyword is used similarly to the way a switch statement is used in JavaScript and TypeScript, except for one key difference: `match` works with more than just primitive values.

## API

`match` takes two arguments

- The value, of type T, we are matching
- A list of `MatchStatement`s, which are generic over `T` the type of the value, and `R` the return value of the `match`

Each match statement is a tuple of two things

- The value, of type T, or a predicate function which takes the value and returns a `boolean`
- The function to call if the predicate matches. This receives the matched value

If no statement is matched, and `matchUtils.fallback` is not given, `match` will throw an error.

## Example

With a primitive value

```typescript
import { match } from 'iron-oxide';

function getParity(n: number) {
    return match(n, [
        [0, () => 'neitherEvenNorOdd'],
        [x => x % 2 === 0, () => 'even'],
        [x => x % 2 !== 0. () => 'odd']
    ]);
}
```

With an `Option` (here, find returns `Option<Person>`)

```typescript
import { match } from 'iron-oxide`;

function getPerson(name: string) {
    const maybePerson = find(people, person => person.name === name);

    return match(maybePerson, [
        [isNone, () => console.log("Couldn't find a person with the name:", name)],
        [isSome, (person) => console.log("Found the person:", person)]
    ]);
}
```

## matchUtils

`iron-oxide` also exports a set of utilities that can be used with a `matchStatement`, these are

- `isOption`, matches any `Option`
- `isSome`, matches any `Some`
- `isNone`, matches any `None`
- `isResult`, matches any `Result`
- `isOk`, matches any `Ok`
- `isErr`, matches any `Err`
- `fallthrough`, which matches any and all values

