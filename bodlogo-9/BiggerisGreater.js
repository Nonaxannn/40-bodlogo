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

function biggerIsGreater(w) {
    let arr = w.split('');
    let i = arr.length - 2;

    // Step 1: Find rightmost character smaller than its next
    while (i >= 0 && arr[i] >= arr[i + 1]) {
        i--;
    }

    if (i === -1) return "no answer";

    // Step 2: Find smallest character after i that is bigger than arr[i]
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) {
        j--;
    }

    // Step 3: Swap arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];

    // Step 4: Reverse from i+1 to end
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }

    return arr.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();
        const result = biggerIsGreater(w);
        ws.write(result + '\n');
    }

    ws.end();
}
