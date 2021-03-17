# Methods

`Option` comes with some built-in methods for interacting with the wrapped value and handling what happens when the `Option` is `None`.

### Interacting with the value

From our introductory example, we now have a `find` function with the signature

```typescript
function find<T>(arr: T[], predicate: (value: T) => boolean): Option<T>;
```

Commonly, we use the `map` method to transform the value.

```typescript
// we have an array of people, and want to find Tom and increment
// his age
const people = [
    {
        name: "Bob",
        age: 25
    },
    {
        name: "Sally",
        age: 26
    },
    {
        name: "Tom",
        age: 28
    }
]; 

const newTom = find(people, ({ name }) => name === "Tom")
    .map(tom => ({
        ...tom,
        age: tom.age + 1
    });
```

Here, we find `Tom` and increment his age inside of `map`. But what happens if we look for someone else that doesn't exist?

```typescript
const newLucy = find(people, ({ name }) => name === "Lucy")
    .map(lucy => ({
        ...lucy,
        age: lucy.age + 1
    });
```

Nothing will actually happen. We would expect that normally this would throw a nasty exception, something on the lines of `lucy is not defined`. In our case, `find` returns `None` , which won't cause the rest of our code to fail. But how do we figure out if the operation failed?

### Checking for failure

`Option` comes with a few ways to check if the value is `None`, such as the `isNone` method

```typescript
if (newLucy.isNone()) {
    console.log("Oops, we couldn't find lucy!");
}
```

Sometimes, we would rather the application throw if we find a `None`. We do this with the `unwrap` method

```typescript
try {
    newLucy.unwrap();
catch (err) {
    // Throws "Called 'Option.unwrap' on a 'None' value"
    console.err(err);
}
```

