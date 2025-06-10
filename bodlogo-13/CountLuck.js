'use strict';

const fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
process.stdin.on('data', data => inputString += data);
process.stdin.on('end', () => {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

function countLuck(grid, k) {
  const n = grid.length, m = grid[0].length;
  const start = [], end = [];

  // Locate 'M' (start) and '*' (goal)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 'M') start.push(i, j);
      else if (grid[i][j] === '*') end.push(i, j);
    }
  }

  const [sx, sy] = start;
  const [ex, ey] = end;

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const queue = [[sx, sy, 0]]; // x, y, wave count so far
  visited[sx][sy] = true;

  while (queue.length) {
    const [x, y, waves] = queue.shift();

    if (x === ex && y === ey) {
      return waves === k ? "Impressed" : "Oops!";
    }

    // Count available moves from current cell
    let options = [];
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (
        nx >= 0 && nx < n &&
        ny >= 0 && ny < m &&
        !visited[nx][ny] &&
        grid[nx][ny] !== 'X'
      ) {
        options.push([nx, ny]);
      }
    }

    const extraWave = options.length > 1 ? 1 : 0;

    for (const [nx, ny] of options) {
      visited[nx][ny] = true;
      queue.push([nx, ny, waves + extraWave]);
    }
  }

  return "Oops!"; // Shouldn't happen per problem constraints
}

function main() {
  const t = parseInt(readLine().trim(), 10);
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  for (let ti = 0; ti < t; ti++) {
    const [n, m] = readLine().trim().split(' ').map(Number);
    let grid = [];
    for (let i = 0; i < n; i++) {
      grid.push(readLine().trim().split(''));
    }
    const k = parseInt(readLine().trim(), 10);

    const result = countLuck(grid, k);
    ws.write(result + '\n');
  }

  ws.end();
}
