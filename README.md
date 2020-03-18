# TypeScript-optimization
Tests and benchmarks different codes in TypeScript for different JavaScript versions (ES5 vs ES6 and above).

### Traditional `for` vs `for-of` vs `for-in`- Looping ovr Arrays

- ES6 and above: traditional `for` is **faster** than `for-of` that is faster than `for-in`
- ES5 and lower:Traditional `for` is **similar to** `for-of` and both faster than `for-in`.

```typescript
// Traditional
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {   // Don't use `i < arr.length` instead
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
