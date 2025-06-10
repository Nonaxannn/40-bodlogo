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

function isBalanced(s) {
    const stack = [];
    const bracketPairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const c of s) {
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            if (stack.length === 0) return "NO";
            const top = stack.pop();
            if (bracketPairs[c] !== top) {
                return "NO";
            }
        }
    }
    
    return stack.length === 0 ? "YES" : "NO";
}

function main() {
    const t = parseInt(readLine(), 10);
    
    for (let i = 0; i < t; i++) {
        const s = readLine().trim();
        console.log(isBalanced(s));
    }
}