# TypeScript-optimization
Tests and benchmarks different codes in TypeScript for different JavaScript versions (ES5 vs ES6 and above).

### Traditional `for` vs `for-of` - Looping ovr Arrays

- Traditional `for` is **faster** than `for-of` for ES6 and above.
- Traditional `for` is **similar to** `for-of` for ES5 (no meaningful difference).

```typescript
// Traditional
let sum = 0;
for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i];
}

// for - of
let sum = 0;
for (let n of arr) sum += n;
```


The reason: probably because of `var` vs `let`.

<details>
<summary>Benchmark-Result</summary>

    ES2020:

    for-traditional x 110,906 ops/sec Â±0.15% (94 runs sampled)
    for-of x 81,956 ops/sec Â±1.09% (92 runs sampled)
    Fastest is for-traditional


    ES 2018:

    for-traditional x 110,582 ops/sec Â±0.50% (95 runs sampled)
    for-of x 83,032 ops/sec Â±0.55% (94 runs sampled)
    Fastest is for-traditional

    ES 6:

    for-traditional x 110,783 ops/sec Â±0.41% (97 runs sampled)
    for-of x 83,222 ops/sec Â±0.25% (96 runs sampled)
    Fastest is for-traditional


    ES5:

    for-traditional x 110,915 ops/sec Â±0.28% (92 runs sampled)
    for-of x 111,122 ops/sec Â±0.20% (93 runs sampled)
    Fastest is for-of

</details>
