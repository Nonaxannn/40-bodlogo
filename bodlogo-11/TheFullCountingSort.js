'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function countSort(arr) {
    const result = [];
    const n = arr.length;
    const buckets = Array.from({ length: 100 }, () => []);

    for (let i = 0; i < n; i++) {
        let [x, s] = arr[i];
        x = parseInt(x, 10);
        if (i < n / 2) {
            buckets[x].push('-');
        } else {
            buckets[x].push(s);
        }
    }

    for (let i = 0; i < 100; i++) {
        for (let str of buckets[i]) {
            result.push(str);
        }
    }

    console.log(result.join(' '));
}

function main() {
    const n = parseInt(readLine().trim(), 10);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(readLine().trim().split(' '));
    }

    countSort(arr);
}
