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

function for_traditional_keys_concat(obj: Obj) {
  let sum = ""
  const keys = Object.keys(obj)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum = sum.concat(obj[keys[i]])
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

function for_in_concat(obj: Obj) {
  let sum = ""
  for (const k in obj) {
    sum = sum.concat(obj[k])
  }
  return sum
}

/* ************************************************************************* */
// test
const testout = for_traditional_keys(obj)
console.assert(
  testout === for_traditional_keys(obj) &&
    testout === for_traditional_keys_concat(obj) &&
    testout === for_in(obj) &&
    testout === for_in_concat(obj)
)
console.log("string length:", testout.length)

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional_keys", () => for_traditional_keys(obj))
suite.add("for_traditional_keys_concat", () => for_traditional_keys_concat(obj))
suite.add("for_in", () => for_in(obj))
suite.add("for_in_concat", () => for_in_concat(obj))

// add listeners
suite.on("cycle", (event: { target: any }) => console.log(String(event.target)))
suite.on("complete", () => console.log("Fastest is " + suite.filter("fastest").map("name")))

// run benchmark
console.log("obj string string")
suite.run({ async: false })

/* ************************************************************************* */

export {}
