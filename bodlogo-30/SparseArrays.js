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

function matchingStrings(stringList, queries) {
    const freqMap = new Map();
    
    // Count frequencies of each string in stringList
    for (const str of stringList) {
        freqMap.set(str, (freqMap.get(str) || 0) + 1);
    }
    
    // Prepare result array for each query
    const result = [];
    for (const query of queries) {
        result.push(freqMap.get(query) || 0);
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');
    
    const stringListCount = parseInt(readLine().trim(), 10);
    const stringList = [];
    
    for (let i = 0; i < stringListCount; i++) {
        stringList.push(readLine().trim());
    }
    
    const queriesCount = parseInt(readLine().trim(), 10);
    const queries = [];
    
    for (let i = 0; i < queriesCount; i++) {
        queries.push(readLine().trim());
    }
    
    const res = matchingStrings(stringList, queries);
    
    ws.write(res.join('\n') + '\n');
    ws.end();
}