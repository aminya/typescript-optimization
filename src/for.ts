const Benchmark = require('benchmark')
let suite = new Benchmark.Suite

const arr: number[] = [];
for (let i = 0; i < 10000; ++i) arr.push(i);


// add tests
suite.add("for-traditional", function () {
    let sum = 0;
    for (let i = 0, l = arr.length; i < l; ++i) {
        sum += arr[i];
    }
})

suite.add('for-of', function () {
    let sum = 0;
    for (let n of arr) sum += n;
})

// add listeners
suite.on('cycle', function (event) {
    console.log(String(event.target));
})
suite.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
suite.run({'async': false});

