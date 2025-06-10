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

function main() {
    const stackNewest = [];
    const stackOldest = [];
    const q = parseInt(readLine(), 10);
    
    for (let i = 0; i < q; i++) {
        const query = readLine().split(' ').map(Number);
        const type = query[0];
        
        if (type === 1) {
            // Enqueue operation
            const x = query[1];
            stackNewest.push(x);
        } else if (type === 2) {
            // Dequeue operation
            if (stackOldest.length === 0) {
                // Transfer elements from stackNewest to stackOldest
                while (stackNewest.length > 0) {
                    stackOldest.push(stackNewest.pop());
                }
            }
            stackOldest.pop();
        } else if (type === 3) {
            // Print front element
            if (stackOldest.length === 0) {
                // Transfer elements from stackNewest to stackOldest
                while (stackNewest.length > 0) {
                    stackOldest.push(stackNewest.pop());
                }
            }
            console.log(stackOldest[stackOldest.length - 1]);
        }
    }
}