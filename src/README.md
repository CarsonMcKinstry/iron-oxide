# iron-oxide

`iron-oxide` offers some Rust style exception handling and rudimentary pattern matching.

## The Problem

Exception handling in JavaScript and TypeScript can be notoriously cumbersome and confusing. For example, `Array.prototype.find` returns `undefined` and `Array.prototype.indexOf` returns `-1`; the return types for these exceptions don't match and thus can be confusing, especially for newer developers. JS also allows you to throw errors and catch them using `try/catch` blocks. The problem compounds itself even more when we start using promises and asynchronous code.

## The Solution

In Rust, we have two types in the standard library [`Option`](https://doc.rust-lang.org/rust-by-example/std/option.html) and [`Result`](https://doc.rust-lang.org/rust-by-example/std/result.html) for handling exceptions. `Option` is used to catch failure in a part of the application where it doesn't make sense to `panic`, or `throw` in the case of JavaScript. `Result` is similar to `Option` except that it can contain the reason for the failure, allowing us to say _why_ a function failed.

`Option` comes in two flavors:

* `Some` representing success or a value
* `None` representing failure or lack of a value

`Result` also comes in two flavors:

* `Ok` representing success or a value
* `Err` representing failure, or lack of a value, _with a reason_

## Pattern Matching

Rust provides pattern matching through the use of the `match` keyword. `iron-oxide` attempts to replicate this by including a `match` function.

