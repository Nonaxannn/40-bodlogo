'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => inputString += inputStdin);
process.stdin.on('end', () => { inputString = inputString.split('\n'); main(); });

function readLine() {
  return inputString[currentLine++];
}

function sherlockAndAnagrams(s) {
  const n = s.length;
  const freq = new Map();
  let count = 0;

  for (let len = 1; len < n; len++) {
    for (let i = 0; i + len <= n; i++) {
      const sub = s.substring(i, i + len);
      // Sort chars to generate the signature
      const key = sub.split('').sort().join('');
      const prev = freq.get(key) || 0;
      count += prev;              // Add existing matches
      freq.set(key, prev + 1);   // Increment the count
    }
  }
  return count;
}

function main() {
  const t = parseInt(readLine().trim(), 10);
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  for (let ti = 0; ti < t; ti++) {
    const s = readLine().trim();
    const result = sherlockAndAnagrams(s);
    ws.write(result + '\n');
  }

  ws.end();
}
