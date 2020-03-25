import { Chance } from "chance"
const chance = new Chance()
const Benchmark = require("benchmark")

/* ************************************************************************* */
// parameter
const obj_length = 20

console.log("object size of "+ obj_length)

/* ************************************************************************* */
// dict string string

/* ************************************************************************* */
// setup
const dict: {[p:string] : string} = {}
for (let i = 0; i < obj_length; i++) {
  dict[chance.string()] = chance.string()
}

/* ************************************************************************* */
// functions
function for_traditional(dict) {
  let sum = ""
  const keys = Object.keys(dict)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum.concat(dict[keys[i]])
  }
  return sum
}

function for_of (dict) {
  let sum = ""
  const keys = Object.keys(dict)
  for (const k of keys) {
    sum.concat(dict[k])
  }
  return sum
}

function for_in (dict) {
  let sum = ""
  for (const k in dict) {
    sum.concat(dict[k])
  }
  return sum
}
/* ************************************************************************* */
// test
console.assert(for_of(dict) === for_in(dict) && for_in(dict) === for_traditional(dict))

let suite = new Benchmark.Suite()

// add benchmarks
suite.add("for_traditional", () => for_traditional(dict))
suite.add("for_of", () => for_of(dict))
suite.add("for_in", () => for_in(dict))

// add listeners
suite.on("cycle", (event) => console.log(String(event.target)) )
suite.on("complete", () => console.log("Fastest is " + suite.filter("fastest").map("name")) )

// run benchmark
console.log("dict string string")
suite.run({ async: false })

/* ************************************************************************* */

export {};
