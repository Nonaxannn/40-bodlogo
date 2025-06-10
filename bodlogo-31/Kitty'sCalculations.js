const readline = require('readline');

const MOD = 1_000_000_007;
const LOG = 20;

let tree = [];
let up = [];
let depth = [];
let tin = [];
let tout = [];
let timer = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', line => inputLines.push(line));
rl.on('close', () => {
    main();
});

function main() {
    const [n, q] = inputLines[0].split(' ').map(Number);

    for (let i = 0; i <= n; i++) tree[i] = [];

    for (let i = 1; i < n; i++) {
        const [a, b] = inputLines[i].split(' ').map(Number);
        tree[a].push(b);
        tree[b].push(a);
    }

    up = Array.from({ length: n + 1 }, () => Array(LOG).fill(0));
    depth = Array(n + 1).fill(0);
    tin = Array(n + 1).fill(0);
    tout = Array(n + 1).fill(0);

    dfs(1, 1);
    preprocess(n);

    let lineIndex = n;
    for (let qi = 0; qi < q; qi++) {
        const k = parseInt(inputLines[lineIndex++]);
        const nodes = inputLines[lineIndex++].split(' ').map(Number);

        let total = 0;
        const lcaCache = new Map();

        for (let i = 0; i < k; i++) {
            const u = nodes[i];
            for (let j = i + 1; j < k; j++) {
                const v = nodes[j];

                const key = [Math.min(u, v), Math.max(u, v)].toString();
                let lca_uv;
                if (lcaCache.has(key)) {
                    lca_uv = lcaCache.get(key);
                } else {
                    lca_uv = lca(u, v);
                    lcaCache.set(key, lca_uv);
                }

                const d = depth[u] + depth[v] - 2 * depth[lca_uv];
                const uv = (BigInt(u) * BigInt(v)) % BigInt(MOD);
                const term = (uv * BigInt(d)) % BigInt(MOD);
                total = (total + Number(term)) % MOD;
            }
        }

        console.log(total);
    }
}

function dfs(v, p) {
    tin[v] = ++timer;
    up[v][0] = p;
    depth[v] = (p === v) ? 0 : depth[p] + 1;

    for (const to of tree[v]) {
        if (to !== p) {
            dfs(to, v);
        }
    }

    tout[v] = ++timer;
}

function preprocess(n) {
    for (let j = 1; j < LOG; j++) {
        for (let i = 1; i <= n; i++) {
            if (up[i][j - 1] !== 0) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }
    }
}

function isAncestor(u, v) {
    return tin[u] <= tin[v] && tout[v] <= tout[u];
}

function lca(u, v) {
    if (depth[u] < depth[v]) [u, v] = [v, u];

    let diff = depth[u] - depth[v];
    for (let i = 0; i < LOG; i++) {
        if ((diff & (1 << i)) !== 0) {
            u = up[u][i];
        }
    }

    if (u === v) return u;

    for (let i = LOG - 1; i >= 0; i--) {
        if (up[u][i] !== up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    }

    return up[u][0];
}
