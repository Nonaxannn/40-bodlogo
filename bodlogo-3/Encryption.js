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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s) {
    s = s.replace(/\s/g, '');

    const len = s.length;
    const sqrtLen = Math.sqrt(len);

    let rows = Math.floor(sqrtLen);
    let cols = Math.ceil(sqrtLen);

    if (rows * cols < len) {
        rows++;
    }

    let result = [];

    for (let c = 0; c < cols; c++) {
        let word = '';
        for (let r = 0; r < rows; r++) {
            const idx = r * cols + c;
            if (idx < len) {
                word += s[idx];
            }
        }
        result.push(word);
    }

    return result.join(' ');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = encryption(s);

    ws.write(result + '\n');

    ws.end();
}
