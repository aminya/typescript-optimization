# TypeScript-optimization

Compares different for-loops in TypeScript/JavaScript

Benchmarks are done inside Node.

## Summary:

- Traditional `for` loops are faster.
- Don't call functions (or lookup arrays) in the head of `for` loop
- Define constant variables as constant
- Use `Object.keys` for looping over objects.
- Closure based loops (like `arr.reduce`) are very slow and should be avoided.
- Use Transformers/compilers to transform other types of `for` to `for_traditional`
- For string joining: `concat` is faster than `+`

---

### Running the benchmark

```
npm install
npm run start
```

### Traditional `for` vs `for-of` vs `for-in`- Looping over Arrays

- ES6 and above: the best is `for_traditional_keys`
  Best to worst:
  `for_traditional` > `for_of` > `for_in` > `arr_reduce`

- ES5 and lower: Both `for_traditional` and `for-of` are the best
  Best to worst:
  `for_traditional` == `for_of` > `for_in` > `arr_reduce`

This is true for array of number, string, etc, and for any array size.

**ES5 Node:** if you notice, you see by targeting ES5 the TypeScript compiler converts `for-of` to the `traditional-for`, and that makes it faster than the original `for-of`!! Actually, by setting `"downlevelIteration": true `, you can make `for-of` slow in ES5 too!!! To fix this issue you can use `npm run build` which uses `@babel/plugin-transform-for-of` to convert `for-of` to `traditional-for` ("loose" is faster than "assumeArray").

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

// arr_reduce
let sum = 0
sum = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
}, sum)
```

See the ./src for full explanation.

<details>
<summary>Benchmark-Result</summary>

    -------------------
    ES2020:

    array size of  10

     number array

    rank 1:  for_traditional 1,006,036.38 opts/sec (mean: 994ns, stddev: 0.001ms, 100 samples)
    rank 2:  for_of 588,928.26 opts/sec (mean: 0.002ms, stddev: 0.002ms, 100 samples)
    rank 3:  for_in 547,645.1 opts/sec (mean: 0.002ms, stddev: 0.005ms, 100 samples)
    rank 4:  arr_reduce 100,020.01 opts/sec (mean: 0.01ms, stddev: 0.062ms, 100 samples)

     string array

    rank 1:  for_traditional_str 1,077,586.31 opts/sec (mean: 928ns, stddev: 0.001ms, 100 samples)
    rank 2:  for_of_str 651,465.81 opts/sec (mean: 0.002ms, stddev: 0.005ms, 100 samples)
    rank 3:  for_in_str 640,204.85 opts/sec (mean: 0.002ms, stddev: 0.003ms, 100 samples)
    rank 4:  arr_reduce_str 178,284.91 opts/sec (mean: 0.006ms, stddev: 0.041ms, 100 samples)

    -------------------
    array size of  100

     number array

    rank 1:  for_traditional 344,946.54 opts/sec (mean: 0.003ms, stddev: 0.004ms, 100 samples)
    rank 2:  for_of 100,070.05 opts/sec (mean: 0.01ms, stddev: 0.026ms, 100 samples)
    rank 3:  for_in 98,931.54 opts/sec (mean: 0.01ms, stddev: 0.026ms, 100 samples)
    rank 4:  arr_reduce 93,501.64 opts/sec (mean: 0.011ms, stddev: 0.051ms, 100 samples)

     string array

    rank 1:  for_traditional_str 282,087.44 opts/sec (mean: 0.004ms, stddev: 0.004ms, 100 samples)
    rank 2:  for_of_str 159,108.99 opts/sec (mean: 0.006ms, stddev: 0.02ms, 100 samples)
    rank 3:  for_in_str 84,373.95 opts/sec (mean: 0.012ms, stddev: 0.028ms, 100 samples)
    rank 4:  arr_reduce_str 75,471.7 opts/sec (mean: 0.013ms, stddev: 0.032ms, 100 samples)

    -------------------
    array size of  1000

     number array

    rank 1:  for_traditional 55,193.73 opts/sec (mean: 0.018ms, stddev: 0.046ms, 100 samples)
    rank 2:  for_of 44,591.1 opts/sec (mean: 0.022ms, stddev: 0.028ms, 100 samples)
    rank 3:  for_in 34,046.03 opts/sec (mean: 0.029ms, stddev: 0.056ms, 100 samples)
    rank 4:  arr_reduce 25,354.33 opts/sec (mean: 0.039ms, stddev: 0.045ms, 100 samples)

     string array

    rank 1:  for_traditional_str 53,934.52 opts/sec (mean: 0.019ms, stddev: 0.034ms, 100 samples)
    rank 2:  for_of_str 45,431.83 opts/sec (mean: 0.022ms, stddev: 0.028ms, 100 samples)
    rank 3:  for_in_str 34,488.7 opts/sec (mean: 0.029ms, stddev: 0.053ms, 100 samples)
    rank 4:  arr_reduce_str 17,905.1 opts/sec (mean: 0.056ms, stddev: 0.06ms, 100 samples)

    -------------------
    ES5:

    number array
    array size of 1000
    number array
    for_traditional x 806,810 ops/sec Â±0.32% (93 runs sampled)
    for_of x 809,966 ops/sec Â±0.28% (97 runs sampled)
    for_in x 27,447 ops/sec Â±0.41% (96 runs sampled)
    arr_reduce x 1,093,011 ops/sec ±57.46% (95 runs sampled)
    Fastest is for_of

    string array
    for_traditional_str x 158,800 ops/sec ±0.73% (92 runs sampled)
    for_of_str x 160,705 ops/sec ±0.38% (90 runs sampled)
    for_in_str x 25,161 ops/sec ±0.43% (95 runs sampled)
    arr_reduce_str x 155,332 ops/sec ±3.94% (94 runs sampled)
    Fastest is for_of_str,arr_reduce_str

</details>

### Traditional `for` optimization

- in all versions: first three loop are about the same. Full array lookup in the `for-head` is very slow.

```typescript
// for-traditional
const arr = chance.n(chance.floating, arr_length)
let sum = 0
for (let i = 0, l = arr.length; i < l; ++i) {
  sum += arr[i]
}

// for-traditional-const
const arr = chance2.n(chance2.floating, arr_length)
let sum = 0
const l = arr.length
for (let i = 0; i < l; ++i) {
  sum += arr[i]
}

// for-traditional-length-lookup
const arr = chance3.n(chance3.floating, arr_length)
let sum = 0
for (let i = 0; i < arr.length; ++i) {
  sum += arr[i]
}

// for-traditional-array-lookup
// to only measure its effect on calling inside the for-head
let sum = 0
for (let i = 0; i < arr_return().length; ++i) {
  sum += arr2[i] // only comparing lookup
}
```

<details>
<summary>Benchmark-Result</summary>

    ES2020:
    -------------------
    array size of  10

     number array

    rank 1:  for_traditional 41,949.83 opts/sec (mean: 0.024ms, stddev: 0.007ms, 100 samples)
    rank 2:  for_traditional_const 20,005.6 opts/sec (mean: 0.05ms, stddev: 0.081ms, 100 samples)
    rank 3:  for_traditional_length_lookup 18,777.58 opts/sec (mean: 0.053ms, stddev: 0.118ms, 100 samples)

    -------------------

    array size of  100

     number array

    rank 1:  for_traditional 7,183.08 opts/sec (mean: 0.139ms, stddev: 0.058ms, 100 samples)
    rank 2:  for_traditional_const 7,168.82 opts/sec (mean: 0.139ms, stddev: 0.055ms, 100 samples)
    rank 3:  for_traditional_length_lookup 6,961.9 opts/sec (mean: 0.144ms, stddev: 0.082ms, 100 samples)
    rank 4:  for_traditional_full_lockup 65.56 ops/sec

    -------------------
    array size of  1000

     number array

    rank 1:  for_traditional 785.84 opts/sec (mean: 1.273ms, stddev: 0.16ms, 100 samples)
    rank 2:  for_traditional_const 776.89 opts/sec (mean: 1.287ms, stddev: 0.105ms, 100 samples)
    rank 3:  for_traditional_length_lookup 771.57 opts/sec (mean: 1.296ms, stddev: 0.172ms, 100 samples)
    rank 4:  for_traditional_full_lockup 0.66 ops/sec

    -------------------
    ES5:

    array size of 1000
    number array
    for_traditional x 652 ops/sec Â±0.63% (90 runs sampled)
    for_traditional_const x 654 ops/sec Â±0.99% (91 runs sampled)
    for_traditional_length_lookup x 651 ops/sec Â±1.00% (92 runs sampled)
    for_traditional_full_lockup x 0.66 ops/sec Â±0.79% (6 runs sampled)
    Fastest is for_traditional,for_traditional_const,for_traditional_length_lookup

</details>

### `for-of` optimization

- in all versions: `for_of` with array defined as `const` outside of the loop is faster.

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

    -------------------

    array size of  10

     number array

    rank 1:  for_of 22,915.28 opts/sec (mean: 0.044ms, stddev: 0.091ms, 100 samples)
    rank 2:  for_of_full_lookup 19,462.07 opts/sec (mean: 0.051ms, stddev: 0.095ms, 100 samples)

    -------------------

    array size of  100

     number array

    rank 1:  for_of 6,973.79 opts/sec (mean: 0.143ms, stddev: 0.063ms, 100 samples)
    rank 2:  for_of_full_lookup 3,560.01 opts/sec (mean: 0.281ms, stddev: 0.234ms, 100 samples)

    -------------------

    array size of  1000

     number array

    rank 1:  for_of 756.4 opts/sec (mean: 1.322ms, stddev: 0.254ms, 100 samples)
    rank 2:  for_of_full_lookup 737.15 opts/sec (mean: 1.357ms, stddev: 0.407ms, 100 samples)

    -------------------
    ES5:

    array size of 1000
    number array
    for_of x 652 ops/sec Â±1.09% (90 runs sampled)
    for_of_full_lookup x 654 ops/sec Â±0.75% (93 runs sampled)
    Fastest is for_of_full_lookup,for_of

</details>

### Traditional `for` vs `for-of` vs `for-in`- Looping over Objects

- ES2020 and ES5:

  - the best is `for_traditional_keys`

    Best to worst:

    `for_traditional_keys`> `for_of_keys` > `for_in` > `for_of_values` > `for_traditional_values` > `for_of_entries`


```typescript
function for_traditional_keys(obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum += obj[keys[i]]
  }
  return sum
}
function for_traditional_values(obj) {
  let sum = ""
  const values = Object.values(obj)
  for (let i = 0, l = values.length; i < l; ++i) {
    sum += values[i]
  }
  return sum
}
function for_of_keys(obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (const k of keys) {
    sum += obj[k]
  }
  return sum
}
function for_of_entries(obj) {
  let sum = ""
  const entries = Object.entries(obj)
  for (const [a, k] of entries) {
    sum += a
  }
  return sum
}
function for_of_values(obj) {
  let sum = ""
  const values = Object.values(obj)
  for (const value of values) {
    sum += value
  }
  return sum
}
function for_in(obj) {
  let sum = ""
  for (const k in obj) {
    sum += obj[k]
  }
  return sum
}
```

<details>
<summary>Benchmark-Result</summary>

---

    ES2020:

    object size of  10

     obj string string

    rank 1:  for_traditional_keys 1,043,841.32 opts/sec (mean: 958ns, stddev: 0.001ms, 100 samples)
    rank 2:  for_traditional_values 668,449.12 opts/sec (mean: 0.001ms, stddev: 0.002ms, 100 samples)
    rank 3:  for_of_keys 597,014.95 opts/sec (mean: 0.002ms, stddev: 0.005ms, 100 samples)
    rank 4:  for_of_entries 544,959.15 opts/sec (mean: 0.002ms, stddev: 0.002ms, 100 samples)
    rank 5:  for_of_values 183,083.12 opts/sec (mean: 0.005ms, stddev: 0.038ms, 100 samples)
    rank 6:  for_in 113,791.53 opts/sec (mean: 0.009ms, stddev: 0.053ms, 100 samples)

    object size of  17

     obj string string

    rank 1:  for_traditional_keys 850,340.07 opts/sec (mean: 0.001ms, stddev: 898.266ns, 100 samples)
    rank 2:  for_traditional_values 643,086.81 opts/sec (mean: 0.002ms, stddev: 0.002ms, 100 samples)
    rank 3:  for_of_keys 600,961.51 opts/sec (mean: 0.002ms, stddev: 0.002ms, 100 samples)
    rank 4:  for_of_entries 221,582.1 opts/sec (mean: 0.005ms, stddev: 0.003ms, 100 samples)
    rank 5:  for_of_values 155,666.25 opts/sec (mean: 0.006ms, stddev: 0.042ms, 100 samples)
    rank 6:  for_in 92,395.82 opts/sec (mean: 0.011ms, stddev: 0.079ms, 100 samples)

    -------------------

    object size of  100

     obj string string

    rank 1:  for_traditional_keys 95,301.63 opts/sec (mean: 0.01ms, stddev: 0.02ms, 100 samples)
    rank 2:  for_traditional_values 72,769.61 opts/sec (mean: 0.014ms, stddev: 0.028ms, 100 samples)
    rank 3:  for_of_keys 70,363.07 opts/sec (mean: 0.014ms, stddev: 0.043ms, 100 samples)
    rank 4:  for_of_entries 41,580.04 opts/sec (mean: 0.024ms, stddev: 0.031ms, 100 samples)
    rank 5:  for_of_values 39,178.81 opts/sec (mean: 0.026ms, stddev: 0.027ms, 100 samples)
    rank 6:  for_in 17,924.04 opts/sec (mean: 0.056ms, stddev: 0.074ms, 100 samples)

    -------------------
    object size of  1000

     obj string string

    rank 1:  for_traditional_keys 11,300.33 opts/sec (mean: 0.088ms, stddev: 0.034ms, 100 samples)
    rank 2:  for_traditional_values 10,730.77 opts/sec (mean: 0.093ms, stddev: 0.088ms, 100 samples)
    rank 3:  for_of_keys 8,409.44 opts/sec (mean: 0.119ms, stddev: 0.234ms, 100 samples)
    rank 4:  for_of_entries 5,152.25 opts/sec (mean: 0.194ms, stddev: 0.048ms, 100 samples)
    rank 5:  for_of_values 4,891.1 opts/sec (mean: 0.204ms, stddev: 0.062ms, 100 samples)
    rank 6:  for_in 3,023.82 opts/sec (mean: 0.331ms, stddev: 0.14ms, 100 samples)

    -------------------
    ES5:

    object size of 1000
    obj string string
    for_traditional_keys x 9,348 ops/sec ±0.47% (95 runs sampled)
    for_traditional_values x 4,236 ops/sec ±0.57% (95 runs sampled)
    for_of_keys x 9,019 ops/sec ±1.60% (90 runs sampled)
    for_of_entries x 3,151 ops/sec ±0.20% (96 runs sampled)
    for_of_values x 4,288 ops/sec ±0.35% (95 runs sampled)
    for_in x 7,958 ops/sec ±0.87% (86 runs sampled)
    Fastest is for_traditional_keys

</details>

### String `+` vs `concat`

```ts
// concat
sum = sum.concat(str)

// +
sum += str
```

Mostly `concat` is faster than `+`

<details>
<summary>Benchmark-Result</summary>
```
  -------

    string length: 38
    object size of 3
    obj string string
    for_traditional_keys x 13,019,511 ops/sec ±0.71% (89 runs sampled)
    for_traditional_keys_concat x 13,068,025 ops/sec ±0.72% (90 runs sampled)
    for_in x 30,911,643 ops/sec ±0.95% (89 runs sampled)
    for_in_concat x 31,078,136 ops/sec ±1.31% (88 runs sampled)
    Fastest is for_in_concat,for_in

    -------

    string length: 72
    object size of 5
    obj string string
    for_traditional_keys x 8,173,944 ops/sec ±1.13% (88 runs sampled)
    for_traditional_keys_concat x 8,364,054 ops/sec ±0.99% (93 runs sampled)
    for_in x 19,812,720 ops/sec ±0.93% (92 runs sampled)
    for_in_concat x 20,096,737 ops/sec ±0.88% (92 runs sampled)
    Fastest is for_in_concat

    -------

    object size of  10
    string length: 121

     obj string string

    rank 1:  for_traditional_keys 901,713.29 opts/sec (mean: 0.001ms, stddev: 0.001ms, 100 samples)
    rank 2:  for_traditional_keys_concat 759,301.45 opts/sec (mean: 0.001ms, stddev: 0.001ms, 100 samples)
    rank 3:  for_in 601,684.71 opts/sec (mean: 0.002ms, stddev: 0.002ms, 100 samples)
    rank 4:  for_in_concat 200,924.25 opts/sec (mean: 0.005ms, stddev: 0.035ms, 100 samples)

    -------

    object size of  100
    string length: 1194

     obj string string

    rank 1:  for_traditional_keys 76,155.66 opts/sec (mean: 0.013ms, stddev: 0.034ms, 100 samples)
    rank 2:  for_traditional_keys_concat 70,402.7 opts/sec (mean: 0.014ms, stddev: 0.038ms, 100 samples)
    rank 3:  for_in 66,480.52 opts/sec (mean: 0.015ms, stddev: 0.03ms, 100 samples)
    rank 4:  for_in_concat 57,208.24 opts/sec (mean: 0.017ms, stddev: 0.058ms, 100 samples)

    -------

    object size of  1000
    string length: 12269

     obj string string

    rank 1:  for_traditional_keys 11,736.81 opts/sec (mean: 0.085ms, stddev: 0.042ms, 100 samples)
    rank 2:  for_traditional_keys_concat 11,411.1 opts/sec (mean: 0.088ms, stddev: 0.035ms, 100 samples)
    rank 3:  for_in 11,087.46 opts/sec (mean: 0.09ms, stddev: 0.057ms, 100 samples)
    rank 4:  for_in_concat 10,655.98 opts/sec (mean: 0.094ms, stddev: 0.042ms, 100 samples)

```
</details>
```
