# Using Result

Sometimes we want to give more information about the failure of a function than just returning `None`. The `Result` type is used to do this. It is similar to `Option` in that it can wrap a value, but it can also wrap an error. `Result` is generic over `T`, the type of the value, and `E`, the type of the error.

There are two variants of `Result<T, E>`:

* `Ok(value)`, which indicates success and wraps the `value` of type `T`
* `Err(why)`, which indicates failure and wraps a `why` of type `E`, which should explain the cause of the failure

```typescript
import { Result, Ok, Err } from 'iron-oxide';

// Number.parseInt returns NaN, which we would need to check for later
// let's fix that

function parseInt(
    maybeInt: string,
    radix?: number
): Result<number, string> {
    const result = parseInt(maybeInt, radix);

    if (isNaN(result)) {
        return Err(
            `Attempted to parse ${maybeInt} as an integer`
        );
    }

    return Ok(result);
}
```

