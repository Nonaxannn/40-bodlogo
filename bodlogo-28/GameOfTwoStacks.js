'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function twoStacks(maxSum, a, b) {
    let sum = 0;
    let countA = 0;
    let countB = 0;
    let result = 0;

    // Take as many as possible from stack A first
    while (countA < a.length && sum + a[countA] <= maxSum) {
        sum += a[countA];
        countA++;
    }
    result = countA;

    // Now try taking from stack B, removing from A if needed
    while (countB < b.length) {
        sum += b[countB];
        countB++;
        
        // Remove elements from A if sum exceeds maxSum
        while (sum > maxSum && countA > 0) {
            countA--;
            sum -= a[countA];
        }
        
        // Update result if current combination is valid
        if (sum <= maxSum) {
            result = Math.max(result, countA + countB);
        } else {
            break;
        }
    }

    return result;
}

function main() {
    const g = parseInt(readLine(), 10);
    
    for (let t = 0; t < g; t++) {
        const [n, m, maxSum] = readLine().split(' ').map(Number);
        const a = readLine().split(' ').map(Number);
        const b = readLine().split(' ').map(Number);
        
        console.log(twoStacks(maxSum, a, b));
    }
}