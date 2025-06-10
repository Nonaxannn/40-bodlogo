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

class Point {
    constructor(x, y, moves) {
        this.x = x;
        this.y = y;
        this.moves = moves;
    }
}

function minimumMoves(grid, startX, startY, goalX, goalY) {
    const n = grid.length;
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));
    const queue = [new Point(startX, startY, 0)];
    visited[startX][startY] = true;

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    while (queue.length > 0) {
        const curr = queue.shift();
        
        if (curr.x === goalX && curr.y === goalY) {
            return curr.moves;
        }

        for (const [dx, dy] of directions) {
            let nx = curr.x;
            let ny = curr.y;
            
            while (true) {
                nx += dx;
                ny += dy;
                
                if (nx < 0 || ny < 0 || nx >= n || ny >= n) break;
                if (grid[nx][ny] === 'X') break;
                
                if (!visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push(new Point(nx, ny, curr.moves + 1));
                }
            }
        }
    }
    
    return -1; // unreachable
}

function main() {
    const n = parseInt(readLine(), 10);
    const grid = [];
    
    for (let i = 0; i < n; i++) {
        grid.push(readLine().trim());
    }
    
    const [startX, startY, goalX, goalY] = readLine().split(' ').map(Number);
    console.log(minimumMoves(grid, startX, startY, goalX, goalY));
}