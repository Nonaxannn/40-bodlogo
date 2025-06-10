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
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 * 1. INTEGER n
 * 2. 2D_INTEGER_ARRAY queries
 */

function arrayManipulation(n, queries) {
    // Initialize an array with n + 2 elements, filled with 0s.
    // We use n + 2 to safely handle the b + 1 index for subtractions.
    const arr = new Array(n + 2).fill(0);

    for (const query of queries) {
        const a = query[0];
        const b = query[1];
        const k = query[2];

        arr[a] += k;
        if (b + 1 <= n + 1) { // Ensure b + 1 is within bounds
            arr[b + 1] -= k;
        }
    }

    let max = 0;
    let sum = 0;

    // Calculate prefix sums and find the maximum
    for (let i = 1; i <= n; i++) {
        sum += arr[i];
        if (sum > max) {
            max = sum;
        }
    }

    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let queries = [];

    for (let i = 0; i < m; i++) {
        queries.push(readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10)));
    }

    const result = arrayManipulation(n, queries);

    ws.write(String(result) + '\n');

    ws.end();
}