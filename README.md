# TypeScript-optimization
Tests and benchmarks different codes in TypeScript for different JavaScript versions (ES5 vs ES6 and above).

Benchmarks are done inside Atom (using script package) and Webstorm.

### Traditional `for` vs `for-of` vs `for-in`- Looping ovr Arrays

- ES6 and above: traditional `for` is **faster** than `for-of` that is faster than `for-in`
- ES5 and lower:Traditional `for` is **similar to** `for-of` and both faster than `for-in`.

```typescript
// Traditional
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }

// for - of
  let sum = 0
  for (const a of arr) {
    sum += a
  }

// for - in
  let sum = 0
  for (const i in arr) {
    sum += arr[i]
  }
```

<details>
<summary>Benchmark-Result</summary>

    ES2020:

    for-traditional x 111,162 ops/sec Â±0.16% (96 runs sampled)
    for-of x 83,331 ops/sec Â±0.15% (96 runs sampled)
    for-in x 2,544 ops/sec Â±0.86% (94 runs sampled)
    Fastest is for-traditional

    ES 6:

    for-traditional x 110,622 ops/sec Â±0.34% (95 runs sampled)
    for-of x 83,102 ops/sec Â±0.16% (94 runs sampled)
    for-in x 2,521 ops/sec Â±1.21% (94 runs sampled)
    Fastest is for-traditional

    ES5:

    for-traditional x 110,584 ops/sec Â±0.56% (95 runs sampled)
    for-of x 110,395 ops/sec Â±0.60% (98 runs sampled)
    for-in x 2,604 ops/sec Â±1.05% (95 runs sampled)
    Fastest is for-traditional,for-of

</details>

### Traditional for optimization

- in all versions: all the codes are about the same.

Defining `arr` as `const` or `let` doesn't affect the speed.

```typescript
// for-traditional
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
// for-traditional-const
  let sum = 0
  const l = arr.length
  for (let i = 0; i < l; ++i) {
    sum += arr[i]
  }

// for-traditional-length-lookup
  let sum = 0
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i]
  }
```

<details>
<summary>Benchmark-Result</summary>

    const arr

    ES2020:

    for-traditional x 111,107 ops/sec Â±0.38% (97 runs sampled)
    for-traditional-const x 111,392 ops/sec Â±0.19% (98 runs sampled)
    for-traditional-lookup x 111,242 ops/sec Â±0.22% (95 runs sampled)
    Fastest is for-traditional,for-traditional-const,for-traditional-length-lookup

    ES 6:

    for-traditional x 111,197 ops/sec Â±0.18% (95 runs sampled)
    for-traditional-const x 111,209 ops/sec Â±0.18% (96 runs sampled)
    for-traditional-lookup x 111,111 ops/sec Â±0.13% (96 runs sampled)
    Fastest is for-traditional,for-traditional-const,for-traditional-length-lookup

    ES5:

    for-traditional x 111,351 ops/sec Â±0.17% (98 runs sampled)
    for-traditional-const x 111,326 ops/sec Â±0.15% (96 runs sampled)
    for-traditional-lookup x 110,693 ops/sec Â±0.42% (97 runs sampled)
    Fastest is for-traditional

    let arr:

     ES2020:

    for-traditional x 111,310 ops/sec Â±0.23% (93 runs sampled)
    for-traditional-const x 111,201 ops/sec Â±0.36% (96 runs sampled)
    for-traditional-lookup x 111,430 ops/sec Â±0.20% (99 runs sampled)
    Fastest is for-traditional-length-lookup,for-traditional,for-traditional-const

    ES5:

    for-traditional x 110,594 ops/sec ±0.53% (94 runs sampled)
    for-traditional-const x 111,455 ops/sec ±0.14% (97 runs sampled)
    for-traditional-lookup x 111,463 ops/sec ±0.15% (96 runs sampled)
    Fastest is for-traditional-const,for-traditional-length-lookup

</details>
