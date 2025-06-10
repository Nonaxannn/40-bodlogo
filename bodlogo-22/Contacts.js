function processData(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);

    class TrieNode {
        constructor() {
            this.children = new Map();
            this.count = 0;
        }
    }

    class Trie {
        constructor() {
            this.root = new TrieNode();
        }

        add(word) {
            let node = this.root;
            for (const c of word) {
                if (!node.children.has(c)) {
                    node.children.set(c, new TrieNode());
                }
                node = node.children.get(c);
                node.count++;
            }
        }

        find(prefix) {
            let node = this.root;
            for (const c of prefix) {
                if (!node.children.has(c)) {
                    return 0;
                }
                node = node.children.get(c);
            }
            return node.count;
        }
    }

    const trie = new Trie();

    for (let i = 1; i <= n; i++) {
        const [op, contact] = lines[i].split(' ');
        if (op === 'add') {
            trie.add(contact);
        } else if (op === 'find') {
            console.log(trie.find(contact));
        }
    }
}

// Standard input handling for HackerRank environment
process.stdin.resume();
process.stdin.setEncoding('ascii');
let _input = '';
process.stdin.on('data', function(input) {
    _input += input;
});
process.stdin.on('end', function() {
    processData(_input);
});
