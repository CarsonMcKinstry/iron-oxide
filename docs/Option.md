# Option

An `Option` represents success or the presence of a value. It comes in two variants:

- `None` to indicate failure or the lack of a value
- `Some(value)` to indicate the presence of the given value

## Example

Our most basic example is the `find` function, which looks for a value in an array.

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
}
```

### What is happening here?

Here, we are looping through the array, looking for a value that returns `true` when passed to our `predicate`. If we find something that returns `true`, we wrap that value in a `Some`. If we don't find anything, we return `None`. 

### Why not just return `undefined`?

`undefined`, and by extension `null`, are both unsafe values to do deal with in JavaScript and thus we have to use `if` statements to guard against them. With `Option`, we can start working with this value without worrying about the value being missing. We can do this with one of the many built-in methods on `Option`.

## Methods

All `Option`s are generic over type `T`. Unless otherwise, `T` refers to the type of the `Option`. 

### isSome(): boolean

Returns `true` if the option contains a value.

```typescript

const num = find<number>([1,2,3,4,5], n => n < 5);

if (num.isSome()) {
    console.log('We found a value');
} else {
    console.log('We didn\'t ifnd a value');
}
```

### isNone(): boolean

The opposite of `isSome`, returns true if the option does not contain a value.

```typescript

const num = find<number>([1,2,3,4,5], n => n > 5);

if (num.isNone()) {
    console.log('We didn\'t find a value');
} else {
    console.log('We found a value');
}
```

### unwrap(): T

Returns the contained value if the option is `Some`, throwing otherwise.

```typescript

const num = find<number>([1,2,3,4,5], n => n < 5);

return num.unwrap(); // will return 1
```

### unwrapOr(def: T): T

Returns the contained value if the option is `Some`, return the default value otherwise.

```typescript

const num = find<number>([1,2,3,4,5], n => n > 5);

return num.unwrapOr(6); // will return 6
```

### unwrapOrElse(def: () => T): T

Returns the contained value if the option is `Some`, otherwise returns the result of calling the provided default function. Essentially, this is the same as `unwrapOr` except that the default is lazily evaluated.

```typescript

const num = find<number>([1,2,3,4,5], n => n > 5);

return num.unwrapOrElse(() => 6); // will return 6
```

### map<U>(project: (value: T) => U): Option<U>

`map` allows you to apply a projection or transformation on the value contained in the option, returning a new option with the projected value. Calling `map` on a `None` will return a new `None`. 

```typescript

const num = find<number>([1,2,3,4,5], n => n < 5);

return num.map(n => n + 1); // will return Some(2)
```

