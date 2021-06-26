import { Chance } from "chance"
const chance = new Chance()
import Benchmark from "tiny-benchy"

/* ************************************************************************* */
// parameter
import { arr_length } from "./parameters"

console.log("object size of ", arr_length)

/* ************************************************************************* */
// obj string string

/* ************************************************************************* */
// setup
type Obj = { [p: string]: string }
const obj: Obj = {}
for (let i = 0; i < arr_length; i++) {
  obj[chance.string()] = chance.string()
}

/* ************************************************************************* */
// functions

function for_traditional_keys(obj: Obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum += obj[keys[i]]
  }
  return sum
}

function for_traditional_values(obj: Obj) {
  let sum = ""
  const values = Object.values(obj)
  for (let i = 0, l = values.length; i < l; ++i) {
    sum += values[i]
  }
  return sum
}

function for_of_keys(obj: Obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (const k of keys) {
    sum += obj[k]
  }
  return sum
}

function for_of_entries(obj: Obj) {
  let sum = ""
  const entries = Object.entries(obj)
  for (const [key, value] of entries) {
    sum += value
  }
  return sum
}

function for_of_values(obj: Obj) {
  let sum = ""
  const values = Object.values(obj)
  for (const value of values) {
    sum += value
  }
  return sum
}

function for_in(obj: Obj) {
  let sum = ""
  for (const k in obj) {
    sum += obj[k]
  }
  return sum
}

/* ************************************************************************* */
// test
const testout = for_traditional_keys(obj)

console.assert(
  testout === for_traditional_values(obj) &&
    testout === for_of_keys(obj) &&
    testout === for_of_entries(obj) &&
    testout === for_of_values(obj) &&
    testout === for_in(obj)
)

const suite = new Benchmark(100)

// add benchmarks
suite.add("for_traditional_keys", () => {
  for_traditional_keys(obj)
})
suite.add("for_traditional_values", () => {
  for_traditional_values(obj)
})
suite.add("for_of_keys", () => {
  for_of_keys(obj)
})
suite.add("for_of_entries", () => {
  for_of_entries(obj)
})
suite.add("for_of_values", () => {
  for_of_values(obj)
})
suite.add("for_in", () => {
  for_in(obj)
})

/* ************************************************************************* */

async function main() {
  // run benchmark
  console.log("\n obj string string \n")
  await suite.run()
}
main().catch((e) => {
  throw e
})
