# Using Option

`Option` is used to catch errors in a uniform way, where we don't necessarily care about the failure reason. They are generic over `T`.

There are two variants of `Option<T>`:

* `None`, to indicate failure or lack of a value
* `Some(value)`, a wrapper around of `value` of type `T`

```typescript

import { Option, Some, None } from 'iron-oxide';

// Array.prototype.find returns undefined if it doesn't find a value
// let's fix that
function find<T>(
    arr: T[],
    predicate: (value: T) => boolean
): Option<T> {
    const value = arr.find(v => predicate(v));

    // if the value is undefined, we return `None`, our failure state
    if (value === undefined) {
        return None();
    }

    // otherwise, we wrap the value in `Some`
    return Some(value);
}
```

