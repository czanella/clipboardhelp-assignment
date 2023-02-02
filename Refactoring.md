# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

* Started by moving the TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH constants outside `deterministicPartitionKey`, because constants should be placed at root level

* Moved the hash logic into a separate function, `createHash`, to prevent code repetition and to make tests simpler

* Most of the conditions have been reduced into the main logic at the beginning of the function, clarifying what should be the hierarchy of the data to be used to computate the key: input's `partitionKey` if provided; the stringified `input` otherwise; if no input is provided at all, then it defaults to `TRIVIAL_PARTITION_KEY`.

* The rest of the function handles special input cases, each contained in a small, one-level if block

* More simplification could be achieved but there's a special case in the original function that prevents this: if `partitionKey` is provided and it's a string, it should be used as it is, without stringification; but if the input is a string, it _should_ be stringified ('a' becomes '"a"')