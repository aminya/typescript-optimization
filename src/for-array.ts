const Benchmark = require("benchmark")
let suite = new Benchmark.Suite()
let suite2 = new Benchmark.Suite()

const arr: number[] = []
for (let i = 0; i < 10000; ++i) arr.push(i)

const arr_str: string[] = []
const N = 10
for (let i = 0; i < 10000; ++i) arr_str.push((Math.random().toString(36)+'00000000000000000').slice(2, N+2))

// add tests
suite.add("for-traditional", function() {
  let sum = 0
  for (let i = 0, l = arr.length; i < l; ++i) {
    sum += arr[i]
  }
})

suite.add("for-of", function() {
  let sum = 0
  for (const a of arr) {
    sum += a
  }
})

suite.add("for-in", function() {
  let sum = 0
  for (const i in arr) {
    sum += arr[i]
  }
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


suite2.add("for-traditional-str", function() {
  let sum = ""
  for (let i = 0, l = arr_str.length; i < l; ++i) {
    sum.concat(arr_str[i])
  }
})

suite2.add("for-of-str", function() {
  let sum = ""
  for (const a of arr_str) {
    sum.concat(a)
  }
})

suite2.add("for-in-str", function() {
  let sum = ""
  for (const i in arr_str) {
    sum.concat(arr_str[i])
  }
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
