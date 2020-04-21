# TypeScript-optimization
Compares different for-loops in TypeScript/JavaScript

Benchmarks are done inside Atom (using script package) and Webstorm. Different JavaScript versions (ES2020 and ES5) are tested.

## Summary:
- Traditional `for` loops are faster.
- Don't call functions (or lookup arrays) in the head of `for` loop
- Define constant variables as constant
- Use Transformers/compilers to transform other types of `for` to traditional `for`

---------------------------

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
    ES2020:
    
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

    -------------------    
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
    array size of 10
    number array
    for_traditional x 62,302 ops/sec Â±0.72% (89 runs sampled)
    for_traditional_const x 61,790 ops/sec Â±0.97% (93 runs sampled)
    for_traditional_length_lookup x 62,299 ops/sec Â±1.11% (87 runs sampled)
    for_traditional_full_lockup x 5,647 ops/sec Â±0.94% (93 runs sampled)
    Fastest is for_traditional
    -------------------    

    array size of 100
    number array
    for_traditional x 6,481 ops/sec Â±0.81% (93 runs sampled)
    for_traditional_const x 6,575 ops/sec Â±0.90% (93 runs sampled)
    for_traditional_length_lookup x 6,590 ops/sec Â±0.86% (93 runs sampled)
    for_traditional_full_lockup x 65.56 ops/sec Â±0.89% (68 runs sampled)
    Fastest is for_traditional_length_lookup,for_traditional_const

    -------------------    
    array size of 1000
    number array
    for_traditional x 645 ops/sec Â±0.92% (91 runs sampled)
    for_traditional_const x 643 ops/sec Â±0.83% (91 runs sampled)
    for_traditional_length_lookup x 661 ops/sec Â±0.57% (91 runs sampled)
    for_traditional_full_lockup x 0.66 ops/sec Â±0.67% (6 runs sampled)
    Fastest is for_traditional_length_lookup

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

    -------------------    
    array size of 10
    number array
    for_of x 65,064 ops/sec Â±0.89% (89 runs sampled)
    for_of_full_lookup x 65,289 ops/sec Â±0.92% (94 runs sampled)
    Fastest is for_of_full_lookup,for_of
        
    -------------------    

    array size of 100
    number array
    for_of x 6,542 ops/sec Â±0.74% (93 runs sampled)
    for_of_full_lookup x 6,549 ops/sec Â±1.09% (93 runs sampled)
    Fastest is for_of,for_of_full_lookup
    
    -------------------    

    array size of 1000
    number array
    for_of x 663 ops/sec Â±0.91% (91 runs sampled)
    for_of_full_lookup x 665 ops/sec Â±0.89% (92 runs sampled)
    Fastest is for_of_full_lookup,for_of

    -------------------    
    ES5:

    array size of 1000
    number array
    for_of x 652 ops/sec Â±1.09% (90 runs sampled)
    for_of_full_lookup x 654 ops/sec Â±0.75% (93 runs sampled)
    Fastest is for_of_full_lookup,for_of

</details>


### Traditional `for` vs `for-of` vs `for-in`- Looping ovr Objects

- ES2020 and ES5: 
    - object size of more 17:  the best is `for_traditional_keys`
    
        Best to worst:   
        
        `for_traditional_keys`> `for_of_keys` > `for_in` > `for_of_values` > `for_traditional_values` > `for_of_entries`
    
    - object size of less than 17:  the best is `for_in`.  This is probably because of CPU cache size.
   
        Best to worst:   
        
        `for_in` > `for_traditional_values` > `for_of_values` >  `for_of_entries` > `for_traditional_keys`> `for_of_keys`   

```typescript
function for_traditional_keys(obj: Obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum.concat(obj[keys[i]])
  }
  return sum
}

function for_traditional_values(obj: Obj) {
  let sum = ""
  const values = Object.values(obj)
  for (let i = 0, l = values.length; i < l; ++i) {
    sum.concat(values[i])
  }
  return sum
}

function for_of_keys (obj: Obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (const k of keys) {
    sum.concat(obj[k])
  }
  return sum
}

function for_of_entries (obj: Obj) {
  let sum = ""
  const entries = Object.entries(obj)
  for (const [a, k] of entries) {
    sum.concat(a)
  }
  return sum
}

function for_of_values(obj: Obj) {
  let sum = ""
  const values = Object.values(obj)
  for (const value of values) {
    sum.concat(value)
  }
  return sum
}

function for_in (obj: Obj) {
  let sum = ""
  for (const k in obj) {
    sum.concat(obj[k])
  }
  return sum
}
```

<details>
<summary>Benchmark-Result</summary>

 -------------------    
    ES2020:
    
    object size of 10
    obj string string
    for_traditional_keys x 5,198,136 ops/sec ±1.07% (88 runs sampled)
    for_traditional_values x 10,641,417 ops/sec ±0.65% (92 runs sampled)
    for_of_keys x 4,964,972 ops/sec ±1.14% (88 runs sampled)
    for_of_entries x 5,432,608 ops/sec ±1.08% (89 runs sampled)
    for_of_values x 10,047,025 ops/sec ±0.34% (95 runs sampled)
    for_in x 32,279,989 ops/sec ±0.39% (97 runs sampled)
    Fastest is for_in
        
    object size of 17
    obj string string
    for_traditional_keys x 2,812,406 ops/sec ±1.11% (88 runs sampled)
    for_traditional_values x 6,925,259 ops/sec ±0.52% (93 runs sampled)
    for_of_keys x 2,618,206 ops/sec ±1.54% (83 runs sampled)
    for_of_entries x 3,116,106 ops/sec ±1.33% (90 runs sampled)
    for_of_values x 6,625,984 ops/sec ±0.34% (93 runs sampled)
    for_in x 26,191,330 ops/sec ±1.26% (95 runs sampled)
    Fastest is for_in
    
    object size of 20
    obj string string
    for_traditional_keys x 1,127,018 ops/sec ±1.29% (88 runs sampled)
    for_traditional_values x 279,544 ops/sec ±0.39% (95 runs sampled)
    for_of_keys x 1,112,033 ops/sec ±0.78% (86 runs sampled)
    for_of_entries x 191,583 ops/sec ±0.38% (96 runs sampled)
    for_of_values x 276,410 ops/sec ±1.27% (93 runs sampled)
    for_in x 767,111 ops/sec ±1.19% (83 runs sampled)
    Fastest is for_traditional_keys
    -------------------        
    
    object size of 100
    obj string string
    for_traditional_keys x 200,249 ops/sec ±1.09% (90 runs sampled)
    for_traditional_values x 53,648 ops/sec ±0.93% (93 runs sampled)
    for_of_keys x 193,080 ops/sec ±1.87% (86 runs sampled)
    for_of_entries x 36,891 ops/sec ±0.96% (92 runs sampled)
    for_of_values x 54,290 ops/sec ±0.54% (94 runs sampled)
    for_in x 164,450 ops/sec ±0.95% (93 runs sampled)
    Fastest is for_traditional_keys
        
    -------------------    
    object size of 1000
    obj string string
    for_traditional_keys x 9,539 ops/sec ±0.58% (93 runs sampled)
    for_traditional_values x 4,322 ops/sec ±0.42% (93 runs sampled)
    for_of_keys x 9,606 ops/sec ±0.59% (89 runs sampled)
    for_of_entries x 3,155 ops/sec ±0.25% (96 runs sampled)
    for_of_values x 4,370 ops/sec ±0.33% (96 runs sampled)
    for_in x 8,779 ops/sec ±0.61% (92 runs sampled)
    Fastest is for_of_keys

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
