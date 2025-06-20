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
    inputString = inputString.split('\n').filter(item => item.trim() !== '');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'rotateLeft' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 * 1. INTEGER d
 * 2. INTEGER_ARRAY arr
 */

function rotateLeft(d, arr) {
    const n = arr.length;
    const rotated = new Array(n);

    for (let i = 0; i < n; i++) {
        rotated[i] = arr[(i + d) % n];
    }

    return rotated;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    // The 'n' variable from the Java code (size of array) is not used in the JavaScript main function's input parsing,
    // but it's implicitly derived from the `arr` length.
    // We'll keep the `d` variable as it's directly used.
    const d = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = rotateLeft(d, arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}