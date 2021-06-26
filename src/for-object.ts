import { Chance } from "chance"
const chance = new Chance()
import Benchmark from "benchmark"

/* ************************************************************************* */
// parameter
const obj_length = 1000

console.log("object size of ", obj_length)

/* ************************************************************************* */
// obj string string

/* ************************************************************************* */
// setup
type Obj = { [p: string]: string }
const obj: Obj = {}
for (let i = 0; i < obj_length; i++) {
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
  for (const [a, k] of entries) {
    sum += a
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
  testout === for_traditional_keys(obj) &&
    testout === for_traditional_values(obj) &&
    testout == for_of_keys(obj) &&
    testout == for_of_entries(obj) &&
    testout == for_of_values(obj) &&
    testout === for_in(obj)
)

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional_keys", () => for_traditional_keys(obj))
suite.add("for_traditional_values", () => for_traditional_values(obj))
suite.add("for_of_keys", () => for_of_keys(obj))
suite.add("for_of_entries", () => for_of_entries(obj))
suite.add("for_of_values", () => for_of_values(obj))
suite.add("for_in", () => for_in(obj))

// add listeners
suite.on("cycle", (event: { target: any }) => console.log(String(event.target)))
suite.on("complete", () => console.log("Fastest is " + suite.filter("fastest").map("name")))

// run benchmark
console.log("obj string string")
suite.run({ async: false })

/* ************************************************************************* */

export {}
