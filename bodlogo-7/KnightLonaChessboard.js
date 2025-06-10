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

function bfs(n, a, b) {
    const directions = [
        [a, b], [a, -b], [-a, b], [-a, -b],
        [b, a], [b, -a], [-b, a], [-b, -a]
    ];

    let visited = Array.from({ length: n }, () => Array(n).fill(false));
    let queue = [];

    queue.push([0, 0, 0]); // x, y, distance
    visited[0][0] = true;

    while (queue.length > 0) {
        let [x, y, dist] = queue.shift();

        if (x === n - 1 && y === n - 1) {
            return dist;
        }

        for (const [dx, dy] of directions) {
            let nx = x + dx;
            let ny = y + dy;

            if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
                visited[nx][ny] = true;
                queue.push([nx, ny, dist + 1]);
            }
        }
    }

    return -1; // unreachable
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let results = [];

    for (let a = 1; a < n; a++) {
        let row = [];
        for (let b = 1; b < n; b++) {
            row.push(bfs(n, a, b));
        }
        results.push(row);
    }

    for (const row of results) {
        console.log(row.join(' '));
    }
}
