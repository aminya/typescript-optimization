import { Chance } from "chance"
const chance = new Chance()

const Benchmark = require("benchmark")
let suite = new Benchmark.Suite()

/* ************************************************************************* */
// dict string string

const dict: {[p:string] : string} = {}
for (let i = 0; i < 1000; i++) {
  dict[chance.string()] = chance.string()
}

/* ************************************************************************* */

// add tests
suite.add("for-traditional", function() {
  let sum = ""
  const keys = Object.keys(dict)
  for (let i = 0, l = keys.length; i < l; ++i) {
    sum.concat(dict[keys[i]])
  }
  return sum
})

suite.add("for-of", function() {
  let sum = ""
  const keys = Object.keys(dict)
  for (const k of keys) {
    sum.concat(dict[k])
  }
  return sum
})

suite.add("for-in", function() {
  let sum = ""
  for (const k in dict) {
    sum.concat(dict[k])
  }
  return sum
})

// add listeners
suite.on("cycle", function(event) {
  console.log(String(event.target))
})
suite.on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"))
})
// run async
suite.run({ async: false })

export {}
