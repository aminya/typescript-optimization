import { Chance } from "chance"

const chance = new Chance(12345)
const chance2 = new Chance(12345)

import Benchmark from "tiny-benchy"

/* ************************************************************************* */
// parameter
const arr_length = 1000

console.log("array size of ", arr_length)

/* ************************************************************************* */
// number array

function arr_return() {
  const arr = chance2.n(chance2.floating, arr_length)
  return arr
}
/* ************************************************************************* */
// functions

function for_of() {
  // array is made inside the function for fare comparison
  const arr = chance.n(chance.floating, arr_length)
  let sum = 0
  for (const a of arr) {
    sum += a
  }
  return sum
}

function for_of_full_lookup() {
  let sum = 0
  for (const a of arr_return()) {
    sum += a
  }
  return sum
}
/* ************************************************************************* */
// test
console.assert(for_of() === for_of_full_lookup())

const suite = new Benchmark()

// add benchmarks
suite.add("for_of", () => {
  for_of()
})
suite.add("for_of_full_lookup", () => {
  for_of_full_lookup()
})

/* ************************************************************************* */

async function main() {
  // run benchmark
  console.log("\n number array \n")
  await suite.run()
}
main().catch((e) => {
  throw e
})
