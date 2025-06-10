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

function dfs(node, adjList, visited) {
    visited[node] = true;
    let size = 1;
    for (const neighbor of adjList[node]) {
        if (!visited[neighbor]) {
            size += dfs(neighbor, adjList, visited);
        }
    }
    return size;
}

function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_lib <= c_road) {
        return n * c_lib;
    }

    const adjList = Array.from({ length: n + 1 }, () => []);
    for (const [city1, city2] of cities) {
        adjList[city1].push(city2);
        adjList[city2].push(city1);
    }

    const visited = Array(n + 1).fill(false);
    let totalCost = 0;

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            const componentSize = dfs(i, adjList, visited);
            totalCost += c_lib + (componentSize - 1) * c_road;
        }
    }

    return totalCost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const [n, m, c_lib, c_road] = readLine().trim().split(' ').map(Number);

        const cities = [];
        for (let i = 0; i < m; i++) {
            const [city1, city2] = readLine().trim().split(' ').map(Number);
            cities.push([city1, city2]);
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);
        ws.write(result + '\n');
    }

    ws.end();
}
