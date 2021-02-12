# iron-oxide

Rust style exception handling in TypeScript

## Option

An `Option` represents success or the presence of a value. It comes in two variants:

- `None` to indicate failure or the lack of a value
- `Some(value)` to indicate the presence of the given value

Example:

```typescript

import { Option, None, Some } from 'iron-oxide';

function find<T>(array: T[], predicate: (el: T) => boolean): Option<T> {
    const value = array.find(predicate);

    if (value === undefined) {
        return None();
    }

    return Some(value);
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
