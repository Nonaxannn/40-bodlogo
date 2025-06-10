'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function larrysArray(A) {
    let inversions = 0;
    const n = A.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (A[i] > A[j]) {
                inversions++;
            }
        }
    }

    return (inversions % 2 === 0) ? "YES" : "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);
        const A = readLine().trim().split(' ').map(Number);
        const result = larrysArray(A);

        ws.write(result + '\n');
    }

    ws.end();
}
