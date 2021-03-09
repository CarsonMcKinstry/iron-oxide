# iron-oxide

Rust style exception handling in TypeScript

## Documentation

Documentation is hosted as an [mdbook](https://github.com/rust-lang/mdBook) at [iron-oxide.js.org](https://iron-oxide.js.org).

## Option

An `Option` represents success or the presence of a value. It comes in two variants:

- `None` to indicate failure or the lack of a value
- `Some(value)` to indicate the presence of the given value

Example:

```typescript

import { Option, None, Some } from 'iron-oxide';

function find<T>(array: T[], predicate: (el: T) => boolean): Option<T> {
    for (const el of array) {
        if (predicate(el)) {
            return Some(el);
        }
    }

    return None();
}
```

## Result

A `Result` is like `Option`, but it also can represent the failure state with a reason. It also comes in two variants:

- `Err(error)` to indicate an error state, along with a message of why
- `Ok(value)` to indicate the success state

Example:

```typescript

import { Result, Ok, Err } from 'iron-oxide';

function parseInt(n: string, radix: number = 10): Result<number, string> {
    const value = Number.parseInt(n, radix);

    if (isNaN(value)) {
        return Err(`Unable to parse ${n} as an integer`);
    }

    return Ok(value);
}
```

## Match

A `match` statement is like a switch statement on steroids. It can be used similarly to switch, but works with more than just primitive values. Namely, you can hand it a primitive value, an object, an array, or a function which returns a boolean.

```typescript

import { match } from 'iron-oxide';

function isEvenOrOdd(n: number) {
    return match (n, [
        [0, () => 'neitherEvenNorOdd'],
        [x => x % 2 === 0, () => 'even'],
        [x => x % 2 !== 0, () => 'odd']
    ]);
}
```