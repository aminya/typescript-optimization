import { Chance } from "chance"

const chance = new Chance(12345)
const chance2 = new Chance(12345)
const chance3 = new Chance(12345)
const chance4 = new Chance(12345)

import Benchmark from "benchmark"

/* ************************************************************************* */
// parameter
const arr_length = 1000

console.log("array size of "+ arr_length)

/* ************************************************************************* */
// number array

function arr_return() {
  const arr = chance4.n(chance4.floating, arr_length)
  return arr
}
const arr2 = arr_return()

/* ************************************************************************* */
// functions

function for_traditional () {
  // array is made inside the function for fare comparison with for_traditional_full_lockup
  const arr = chance.n(chance.floating, arr_length)
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
  return sum
}

function for_traditional_const () {
  // array is made inside the function for fare comparison for_traditional_full_lockup
  const arr = chance2.n(chance2.floating, arr_length)
  let sum = 0
  const l = arr.length
  for (let i = 0; i < l; ++i) {
    sum += arr[i]
  }
  return sum
}

function for_traditional_length_lookup () {
  // array is made inside the function for fare comparison for_traditional_full_lockup
  const arr = chance3.n(chance3.floating, arr_length)
  let sum = 0
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i]
  }
  return sum
}

// to only measure its effect on calling inside the for-head
function for_traditional_full_lockup (arr2) {
  let sum = 0
  for (let i = 0; i < arr_return().length; ++i) {
    sum += arr2[i] // only comparing lookup

  }
  return sum
}

/* ************************************************************************* */
// test
const r1 = for_traditional()
const r2 = for_traditional_const()
const r3 = for_traditional_length_lookup()
const r4 = for_traditional_full_lockup(arr2)
console.assert( (r1 === r2) && (r2 === r3) && (r3 == r4))

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional", () => for_traditional())
suite.add("for_traditional_const", () => for_traditional_const())
suite.add("for_traditional_length_lookup", () => for_traditional_length_lookup())
suite.add("for_traditional_full_lockup", () => for_traditional_full_lockup(arr2))

// add listeners
suite.on("cycle", (event: {target: any}) => console.log(String(event.target)) )
suite.on("complete", () => console.log("Fastest is " + suite.filter("fastest").map("name")) )

// run benchmark
console.log("number array")
suite.run({ async: false })

/* ************************************************************************* */

export {};
