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
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

function timeInWords(h, m) {
    const numbers = [
        '', 'one', 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
        'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
        'eighteen', 'nineteen', 'twenty', 'twenty one', 'twenty two',
        'twenty three', 'twenty four', 'twenty five', 'twenty six',
        'twenty seven', 'twenty eight', 'twenty nine'
    ];

    if (m === 0) {
        return `${numbers[h]} o' clock`;
    } else if (m === 15) {
        return `quarter past ${numbers[h]}`;
    } else if (m === 30) {
        return `half past ${numbers[h]}`;
    } else if (m === 45) {
        return `quarter to ${numbers[h + 1]}`;
    } else if (m < 30) {
        const minuteWord = m === 1 ? 'minute' : 'minutes';
        return `${numbers[m]} ${minuteWord} past ${numbers[h]}`;
    } else {
        const remaining = 60 - m;
        const minuteWord = remaining === 1 ? 'minute' : 'minutes';
        return `${numbers[remaining]} ${minuteWord} to ${numbers[h + 1]}`;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine().trim(), 10);
    const m = parseInt(readLine().trim(), 10);

    const result = timeInWords(h, m);

    ws.write(result + '\n');
    ws.end();
}
