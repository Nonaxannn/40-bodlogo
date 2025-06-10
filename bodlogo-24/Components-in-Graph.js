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

class DSU {
    constructor(maxNodes) {
        this.parent = new Array(maxNodes);
        this.size = new Array(maxNodes);
        for (let i = 1; i < maxNodes; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x);
        const py = this.find(y);
        if (px !== py) {
            this.size[py] += this.size[px];
            this.parent[px] = py;
        }
    }
}

function main() {
    const n = parseInt(readLine(), 10); // number of edges
    const maxNodes = 2 * n + 1; // nodes are 1-indexed, up to 2*n
    
    const dsu = new DSU(maxNodes);
    
    for (let i = 0; i < n; i++) {
        const [u, v] = readLine().split(' ').map(Number);
        dsu.union(u, v);
    }

    let min = Infinity;
    let max = -Infinity;

    for (let i = 1; i < maxNodes; i++) {
        if (dsu.parent[i] === i && dsu.size[i] > 1) {
            min = Math.min(min, dsu.size[i]);
            max = Math.max(max, dsu.size[i]);
        }
    }

    console.log(`${min} ${max}`);
}