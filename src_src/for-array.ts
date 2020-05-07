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
/* ************************************************************************* */
// test
console.assert(for_of(arr) === for_in(arr) && for_in(arr) === for_traditional(arr))

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional", () => for_traditional(arr))
suite.add("for_of", () => for_of(arr))
suite.add("for_in", () => for_in(arr))

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
    sum.concat(arr_str[i])
  }
  return sum
}

/* ************************************************************************* */
// test
console.assert(for_of_str(arr_str) === for_in_str(arr_str) && for_in_str(arr_str) === for_traditional_str(arr_str))


let suite2 = new Benchmark.Suite()

// add benchmarks
suite2.add("for_traditional_str", () => for_traditional_str(arr_str))
suite2.add("for_of_str", () => for_of_str(arr_str))
suite2.add("for_in_str", () => for_in_str(arr_str))

// add listeners
suite2.on("cycle", (event) => console.log(String(event.target)) )
suite2.on("complete", () => console.log("Fastest is " + suite2.filter("fastest").map("name")) )

// run benchmark
console.log("string array")
suite2.run({ async: false })

/* ************************************************************************* */

export {};
