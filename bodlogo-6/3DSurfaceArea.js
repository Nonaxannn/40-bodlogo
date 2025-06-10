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

function surfaceArea(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let totalArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] > 0) {
                // Add top and bottom surface area
                totalArea += 2;

                // Up neighbor
                let up = i > 0 ? grid[i - 1][j] : 0;
                totalArea += Math.max(grid[i][j] - up, 0);

                // Down neighbor
                let down = i < rows - 1 ? grid[i + 1][j] : 0;
                totalArea += Math.max(grid[i][j] - down, 0);

                // Left neighbor
                let left = j > 0 ? grid[i][j - 1] : 0;
                totalArea += Math.max(grid[i][j] - left, 0);

                // Right neighbor
                let right = j < cols - 1 ? grid[i][j + 1] : 0;
                totalArea += Math.max(grid[i][j] - right, 0);
            }
        }
    }

    return totalArea;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstLine = readLine().trim().split(' ');
    const H = parseInt(firstLine[0], 10);
    const W = parseInt(firstLine[1], 10);

    let grid = [];

    for (let i = 0; i < H; i++) {
        const row = readLine().trim().split(' ').map(Number);
        grid.push(row);
    }

    const result = surfaceArea(grid);

    ws.write(result + '\n');
    ws.end();
}
