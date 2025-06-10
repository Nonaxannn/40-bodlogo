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

/*
 * Complete the 'countArray' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER x
 */

function countArray(n, k, x) {
    const MOD = 1000000007;
 let prevX = x === 1 ? 1 : 0;
    let prevNotX = x === 1 ? 0 : 1;

    for (let i = 2; i <= n; i++) {
        let newNotX = (prevNotX * (k - 2) + prevX * (k - 1)) % MOD;
        let newX = prevNotX % MOD;

        prevNotX = newNotX;
        prevX = newX;
    }

    return prevX;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const x = parseInt(firstMultipleInput[2], 10);

    const answer = countArray(n, k, x);

    ws.write(answer + '\n');

    ws.end();
}
