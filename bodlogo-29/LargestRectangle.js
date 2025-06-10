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

function largestRectangle(h) {
    const stack = [];
    let maxArea = 0;
    const n = h.length;
    let i = 0;
    
    while (i < n) {
        if (stack.length === 0 || h[i] >= h[stack[stack.length - 1]]) {
            stack.push(i++);
        } else {
            const top = stack.pop();
            const area = h[top] * (stack.length === 0 ? i : i - stack[stack.length - 1] - 1);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    while (stack.length > 0) {
        const top = stack.pop();
        const area = h[top] * (stack.length === 0 ? i : i - stack[stack.length - 1] - 1);
        maxArea = Math.max(maxArea, area);
    }
    
    return maxArea;
}

function main() {
    const n = parseInt(readLine(), 10);
    const h = readLine().split(' ').map(Number);
    console.log(largestRectangle(h));
}