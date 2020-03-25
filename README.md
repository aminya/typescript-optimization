# TypeScript-optimization
Tests and benchmarks different codes in TypeScript for different JavaScript versions (ES5 vs ES6 and above).

Benchmarks are done inside Atom (using script package) and Webstorm.

### Traditional `for` vs `for-of` vs `for-in`- Looping ovr Arrays

- ES6 and above: traditional `for` is **faster** than `for-of`. Both are much faster than `for-in`.
- ES5 and lower:Traditional `for` is **similar to** `for-of`, by `for-of` being a small touch faster. Both are much faster than `for-in`.

This is true for array of number, string, etc, and for any array size (10, 100, 1000 are tested).

If you notice, you see by targeting ES5 the TypeScript compiler converts `for-of` to the `traditional-for`, and that makes it faster than the original `for-of`!! Actually, by setting `"downlevelIteration": true
`, you can make `for-of` slow in ES5 too!!!  To fix this issue you can use `npm run build` which uses `@babel/plugin-transform-for-of` to convert `for-of` to `traditional-for` ("loose" is faster than "assumeArray").

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
See the ./src for full explanation.

<details>
<summary>Benchmark-Result</summary>

    -------------------    
    array size of 10

    ES6 and ES2020:
    
    array size of 10
    number array
    for_traditional x 93,918,160 ops/sec Â±2.26% (85 runs sampled)
    for_of x 20,043,782 ops/sec Â±0.64% (94 runs sampled)
    for_in x 1,855,402 ops/sec Â±0.89% (95 runs sampled)
    Fastest is for_traditional
    
    string array
    for_traditional_str x 62,883,817 ops/sec Â±0.23% (92 runs sampled)
    for_of_str x 36,321,814 ops/sec Â±0.47% (92 runs sampled)
    for_in_str x 1,928,360 ops/sec Â±0.68% (93 runs sampled)
    Fastest is for_traditional_str
        
    -------------------    
    array size of 100

    ES6 and ES2020:
    
    array size of 100
    number array
    for_traditional x 9,624,379 ops/sec Â±0.29% (91 runs sampled)
    for_of x 2,293,562 ops/sec Â±0.83% (91 runs sampled)
    for_in x 257,905 ops/sec Â±0.34% (97 runs sampled)
    Fastest is for_traditional
    
    string array
    for_traditional_str x 7,489,087 ops/sec Â±0.29% (94 runs sampled)
    for_of_str x 4,219,285 ops/sec Â±0.23% (96 runs sampled)
    for_in_str x 275,434 ops/sec Â±0.34% (96 runs sampled)
    Fastest is for_traditional_str
    
    -------------------    
    array size of 10000

    ES6 and ES2020:

    array size of 1000
    number array
    for_traditional x 807,444 ops/sec Â±0.22% (89 runs sampled)
    for_of x 310,846 ops/sec Â±0.62% (96 runs sampled)
    for_in x 27,566 ops/sec Â±0.33% (96 runs sampled)
    Fastest is for_traditional
    
    string array
    for_traditional_str x 643,079 ops/sec Â±1.59% (88 runs sampled)
    for_of_str x 439,983 ops/sec Â±0.30% (97 runs sampled)
    for_in_str x 28,672 ops/sec Â±1.55% (91 runs sampled)
    Fastest is for_traditional_str

    ES5:

    number array
    array size of 1000
    number array
    for_traditional x 806,810 ops/sec Â±0.32% (93 runs sampled)
    for_of x 809,966 ops/sec Â±0.28% (97 runs sampled)
    for_in x 27,447 ops/sec Â±0.41% (96 runs sampled)
    Fastest is for_of
    
    string array
    for_traditional_str x 641,393 ops/sec Â±3.32% (81 runs sampled)
    for_of_str x 676,553 ops/sec Â±0.26% (96 runs sampled)
    for_in_str x 29,130 ops/sec Â±1.45% (90 runs sampled)
    Fastest is for_of_str
    
</details>

### Traditional `for` optimization

- in all versions: First three the codes are about the same, but full array lookup in the `for-head` is very slow.

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

// for-traditional-array-lookup
// to only measure its effect on calling inside the for-head
let sum = 0;
for (let i = 0; i < arr_return().length; ++i) {
    sum += arr[i];
}
```

<details>
<summary>Benchmark-Result</summary>

    const arr

    ES2020:

    for-traditional x 111,107 ops/sec Â±0.38% (97 runs sampled)
    for-traditional-const x 111,392 ops/sec Â±0.19% (98 runs sampled)
    for-traditional-lookup x 111,242 ops/sec Â±0.22% (95 runs sampled)
    for-traditional-full-lookup x 1.77 ops/sec ±1.09% (9 runs sampled)
    Fastest is for-traditional,for-traditional-const,for-traditional-length-lookup

    ES 6:

    for-traditional x 111,197 ops/sec Â±0.18% (95 runs sampled)
    for-traditional-const x 111,209 ops/sec Â±0.18% (96 runs sampled)
    for-traditional-lookup x 111,111 ops/sec Â±0.13% (96 runs sampled)
    for-traditional-full-lookup x 1.78 ops/sec ±0.77% (9 runs sampled)
    Fastest is for-traditional,for-traditional-const,for-traditional-length-lookup

    ES5:

    for-traditional x 109,984 ops/sec ±0.67% (95 runs sampled)
    for-traditional-const x 110,267 ops/sec ±0.80% (91 runs sampled)
    for-traditional-length-lookup x 109,373 ops/sec ±0.74% (94 runs sampled)
    for-traditional-full-lookup x 1.68 ops/sec ±3.05% (9 runs sampled)
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


### `for-of` optimization

- in all versions: similar result

```typescript
// for-of
  // array is made inside the function for fare comparison
  const arr = chance.n(chance.floating, arr_length)
  let sum = 0
  for (const a of arr) {
    sum += a
  }

// for-of-full-array-lookup
  let sum = 0
  for (const a of arr_return()) {
    sum += a
  }
```

<details>
<summary>Benchmark-Result</summary>

    ES2020:

    array size of 10
    number array
    for_of x 65,064 ops/sec Â±0.89% (89 runs sampled)
    for_of_full_lookup x 65,289 ops/sec Â±0.92% (94 runs sampled)
    Fastest is for_of_full_lookup,for_of
        
    rray size of 100
    number array
    for_of x 6,542 ops/sec Â±0.74% (93 runs sampled)
    for_of_full_lookup x 6,549 ops/sec Â±1.09% (93 runs sampled)
    Fastest is for_of,for_of_full_lookup
    
    array size of 1000
    number array
    for_of x 663 ops/sec Â±0.91% (91 runs sampled)
    for_of_full_lookup x 665 ops/sec Â±0.89% (92 runs sampled)
    Fastest is for_of_full_lookup,for_of

    ES5:

    array size of 1000
    number array
    for_of x 652 ops/sec Â±1.09% (90 runs sampled)
    for_of_full_lookup x 654 ops/sec Â±0.75% (93 runs sampled)
    Fastest is for_of_full_lookup,for_of

</details>
