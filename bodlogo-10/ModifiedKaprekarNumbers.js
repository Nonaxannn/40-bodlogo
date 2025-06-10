'use strict';

const fs = require('fs');

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

function kaprekarNumbers(p, q) {
    let result = [];

    for (let i = p; i <= q; i++) {
        let d = i.toString().length;
        let square = (i * i).toString();
        let right = square.slice(-d);           // last d digits
        let left = square.slice(0, square.length - d) || '0';  // rest (default to '0')

        let sum = parseInt(left, 10) + parseInt(right, 10);
        if (sum === i) {
            result.push(i);
        }
    }

    if (result.length === 0) {
        console.log("INVALID RANGE");
    } else {
        console.log(result.join(' '));
    }
}

function main() {
    const p = parseInt(readLine().trim(), 10);
    const q = parseInt(readLine().trim(), 10);

    kaprekarNumbers(p, q);
}
