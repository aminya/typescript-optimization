import { Chance } from "chance"
const chance = new Chance()
const Benchmark = require("benchmark")

/* ************************************************************************* */
// parameter
const arr_length = 1000

console.log("array size of "+ arr_length)

/* ************************************************************************* */
// number array

/* ************************************************************************* */
// setup
const arr = chance.n(chance.floating, arr_length)

/* ************************************************************************* */
// functions
function for_traditional(arr: number[]) {
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
  return sum
}

function for_of (arr: number[]) {
  let sum = 0
  for (const a of arr) {
    sum += a
  }
  return sum
}

function for_in (arr: number[]) {
  let sum = 0
  for (const i in arr) {
    sum += arr[i]
  }
  return sum
}

function arr_reduce(arr: number[]) {
  let sum = 0
  sum = arr.reduce( (accumulator, currentValue) => {
    return accumulator + currentValue;
  }, sum)
  return sum
}

/* ************************************************************************* */
// test
const r1 = for_traditional(arr)
const r2 = for_of(arr)
const r3 = for_in(arr)
const r4 = arr_reduce(arr)
console.assert(
  (r1 === r2) && (r2 === r3) && (r3 == r4)
)

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional", () => for_traditional(arr))
suite.add("for_of", () => for_of(arr))
suite.add("for_in", () => for_in(arr))
suite.add("arr_reduce", () => arr_reduce(arr))

// add listeners
suite.on("cycle", (event) => console.log(String(event.target)) )
suite.on("complete", () => console.log("Fastest is " + suite.filter("fastest").map("name")) )

// run benchmark
console.log("number array")
suite.run({ async: false })

/* ************************************************************************* */
// string array

/* ************************************************************************* */
// setup
const arr_str = chance.n(chance.string, arr_length)

/* ************************************************************************* */
// functions
function for_traditional_str(arr_str: string[]) {
  let sum = ""
  for (let i = 0, l = arr_str.length; i < l; ++i) {
    sum += arr_str[i]
  }
  return sum
}

function for_of_str (arr_str: string[]) {
  let sum = ""
  for (const a of arr_str) {
    sum += a
  }
  return sum
}

function for_in_str (arr_str: string[]) {
  let sum = ""
  for (const i in arr_str) {
    sum += arr_str[i]
  }
  return sum
}

function arr_reduce_str(arr_str: string[]) {
  let sum = ""
  sum = arr_str.reduce( (accumulator, currentValue) => {
    accumulator += currentValue;
    return accumulator
  }, sum)
  return sum
}

/* ************************************************************************* */
// test
const r1_str = for_traditional_str(arr_str)
const r2_str = for_of_str(arr_str)
const r3_str = for_in_str(arr_str)
const r4_str = arr_reduce_str(arr_str)
console.assert(
  (r1_str === r2_str) && (r2_str === r3_str) && (r3_str == r4_str)
)

let suite2 = new Benchmark.Suite()

// add benchmarks
suite2.add("for_traditional_str", () => for_traditional_str(arr_str))
suite2.add("for_of_str", () => for_of_str(arr_str))
suite2.add("for_in_str", () => for_in_str(arr_str))
suite2.add("arr_reduce_str", () => arr_reduce_str(arr_str))

// add listeners
suite2.on("cycle", (event) => console.log(String(event.target)) )
suite2.on("complete", () => console.log("Fastest is " + suite2.filter("fastest").map("name")) )

// run benchmark
console.log("string array")
suite2.run({ async: false })

/* ************************************************************************* */

export {};
