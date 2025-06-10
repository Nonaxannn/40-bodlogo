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

function downToZero(n) {
    if (n === 0) return 0;
    
    // Initialize distance array with -1 (unvisited)
    const dist = new Array(n + 1).fill(-1);
    const queue = [n];
    dist[n] = 0;

    while (queue.length > 0) {
        const curr = queue.shift();
        
        if (curr === 0) return dist[0];

        // Option 1: Subtract 1
        if (curr - 1 >= 0 && dist[curr - 1] === -1) {
            dist[curr - 1] = dist[curr] + 1;
            queue.push(curr - 1);
        }

        // Option 2: Replace with max factor pair
        for (let i = 2; i * i <= curr; i++) {
            if (curr % i === 0) {
                const next = Math.max(i, curr / i);
                if (dist[next] === -1) {
                    dist[next] = dist[curr] + 1;
                    queue.push(next);
                }
            }
        }
    }
    
    return dist[0];
}

function main() {
    const q = parseInt(readLine(), 10);
    
    for (let i = 0; i < q; i++) {
        const n = parseInt(readLine(), 10);
        console.log(downToZero(n));
    }
}