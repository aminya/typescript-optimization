const Benchmark = require("benchmark")
let suite = new Benchmark.Suite()

const arr: number[] = []
for (let i = 0; i < 10000; ++i) arr.push(i)

// add tests
suite.add("for-traditional", function() {
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
  return sum
})

suite.add("for-traditional-const", function() {
  let sum = 0
  const l = arr.length
  for (let i = 0; i < l; ++i) {
    sum += arr[i]
  }
  return sum
})

suite.add("for-traditional-length-lookup", function() {
  let sum = 0
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i]
  }
  return sum
})

function arr_return() {
  const arr: number[] = []
  for (let i = 0; i < 10000; ++i) arr.push(i)
  return arr
}
const arr2 = arr_return()

suite.add("for-traditional-full-lookup", function() {
  let sum = 0
  for (let i = 0; i < arr_return().length; ++i) {
    sum += arr2[i]
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
suite.run({ async: true })

export {};
