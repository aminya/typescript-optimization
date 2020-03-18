const Benchmark = require("benchmark")
let suite = new Benchmark.Suite()

const arr: number[] = []
for (let i = 0; i < 10000; ++i) arr.push(i)

// add tests
suite.add("for-of", function() {
  let sum = 0
  for (const a of arr) {
    sum += a
  }
})

function arr_return() {
  const arr2: number[] = []
  for (let i = 0; i < 10000; ++i) arr2.push(i)
  return arr2
}

suite.add("for-of-full-lookup", function() {
  let sum = 0
  for (const a of arr_return()) {
    sum += a
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
suite.run({ async: true })
