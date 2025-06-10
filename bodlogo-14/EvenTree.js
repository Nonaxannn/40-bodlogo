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

/*
 * Complete the 'evenForest' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER t_nodes
 *  2. INTEGER t_edges
 *  3. INTEGER_ARRAY t_from
 *  4. INTEGER_ARRAY t_to
 */

function evenForest(t_nodes, t_edges, t_from, t_to) {
    const adjList = Array.from({ length: t_nodes + 1 }, () => []);
    const visited = Array(t_nodes + 1).fill(false);
    const subtreeSizes = Array(t_nodes + 1).fill(0);
    let removableEdges = 0;

    // Build adjacency list
    for (let i = 0; i < t_edges; i++) {
        adjList[t_from[i]].push(t_to[i]);
        adjList[t_to[i]].push(t_from[i]);
    }

    // Depth-First Search to calculate subtree sizes
    function dfs(node) {
        visited[node] = true;
        let size = 1;

        for (const neighbor of adjList[node]) {
            if (!visited[neighbor]) {
                size += dfs(neighbor);
            }
        }

        subtreeSizes[node] = size;
        return size;
    }

    // Start DFS from node 1 (root)
    dfs(1);

    // Count removable edges
    for (let i = 2; i <= t_nodes; i++) {
        if (subtreeSizes[i] % 2 === 0) {
            removableEdges++;
        }
    }

    return removableEdges;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const t_nodes = parseInt(firstMultipleInput[0], 10);
    const t_edges = parseInt(firstMultipleInput[1], 10);

    let t_from = [];
    let t_to = [];

    for (let i = 0; i < t_edges; i++) {
        const edge = readLine().replace(/\s+$/g, '').split(' ');

        t_from.push(parseInt(edge[0], 10));
        t_to.push(parseInt(edge[1], 10));
    }

    const result = evenForest(t_nodes, t_edges, t_from, t_to);

    ws.write(result + '\n');

    ws.end();
}
