import { Chance } from "chance"
const chance = new Chance()

const Benchmark = require("benchmark")
let suite = new Benchmark.Suite()
let suite2 = new Benchmark.Suite()

/* ************************************************************************* */
// setup
const arr = chance.n(chance.floating, 10000)
const arr_str = chance.n(chance.string, 10000)

/* ************************************************************************* */

// add tests
suite.add("for-traditional", function() {
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
  return sum
})

suite.add("for-of", function() {
  let sum = 0
  for (const a of arr) {
    sum += a
  }
  return sum
})

suite.add("for-in", function() {
  let sum = 0
  for (const i in arr) {
    sum += arr[i]
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

/* ************************************************************************* */

suite2.add("for-traditional-str", function() {
  let sum = ""
  for (let i = 0, l = arr_str.length; i < l; ++i) {
    sum.concat(arr_str[i])
  }
  return sum
})

suite2.add("for-of-str", function() {
  let sum = ""
  for (const a of arr_str) {
    sum.concat(a)
  }
  return sum
})

suite2.add("for-in-str", function() {
  let sum = ""
  for (const i in arr_str) {
    sum.concat(arr_str[i])
  }
  return sum
})

// add listeners
suite2.on("cycle", function(event) {
  console.log(String(event.target))
})
suite2.on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"))
})
// run async
suite2.run({ async: false })

export {};
