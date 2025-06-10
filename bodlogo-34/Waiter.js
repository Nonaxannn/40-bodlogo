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
    inputString = inputString.split('\n').filter(item => item.trim() !== '');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 * 1. INTEGER_ARRAY number
 * 2. INTEGER q
 */

function waiter(number, q) {
    const answers = [];
    const primes = generatePrimes(q);

    // Simulate stacks using arrays.
    // 'current' will hold the plates for the current iteration (like A_i)
    // 'next' will hold plates that don't satisfy the current prime's divisibility (like A_{i+1})
    // For stack behavior (LIFO), we'll push to the end and pop from the end.
    // For queue behavior (FIFO for bStack), we'll push to the end and shift from the beginning.
    // In this problem, current and next are behaving as stacks.
    // bStack also behaves as a stack for elements being collected, then popped in reverse.

    let current = [...number]; // Start with the initial numbers as the first 'stack' A_0
    let next = [];

    for (let i = 0; i < q; i++) {
        const prime = primes[i];
        let bStack = []; // Plates divisible by the current prime

        // Process plates from the current stack (A_i)
        // Since we are simulating a stack, we take from the top (end of the array)
        while (current.length > 0) {
            const plate = current.pop(); // Take plate from top of current stack
            if (plate % prime === 0) {
                bStack.push(plate); // Add to B_i stack (top)
            } else {
                next.push(plate); // Add to A_{i+1} stack (top)
            }
        }

        // Add plates from B_i stack to the answers.
        // Since B_i is also a stack, we add them to answers from its top to bottom.
        // This means popping from bStack and adding to answers.
        while (bStack.length > 0) {
            answers.push(bStack.pop());
        }

        // Prepare for the next iteration: A_{i+1} becomes A_i
        // 'next' contains the plates that were NOT divisible by the current prime,
        // and these plates need to be processed in the next iteration.
        // Importantly, 'next' now represents the plates for the next round,
        // and they are already in the correct stack order because we pushed them onto 'next'
        // as we popped from 'current'.
        current = next;
        next = []; // Reset 'next' for the new iteration
    }

    // After all queries, any remaining plates in 'current' (A_q) are added to answers
    // from top to bottom.
    while (current.length > 0) {
        answers.push(current.pop());
    }

    return answers;
}

/**
 * Generates a list of prime numbers up to a certain count.
 * @param {number} limit The number of primes to generate.
 * @returns {number[]} An array of prime numbers.
 */
function generatePrimes(limit) {
    const primes = [];
    const MAX_PRIME_CHECK = 13000; // Sufficiently large limit based on typical constraints for q
    const isPrime = new Array(MAX_PRIME_CHECK).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; primes.length < limit && i < MAX_PRIME_CHECK; i++) {
        if (isPrime[i]) {
            primes.push(i);
            for (let j = i * i; j < MAX_PRIME_CHECK; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return primes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    // const n = parseInt(firstMultipleInput[0], 10); // n is not used directly, only the list length
    const q = parseInt(firstMultipleInput[1], 10);

    const number = readLine().replace(/\s+$/g, '').split(' ').map(numberTemp => parseInt(numberTemp, 10));

    const result = waiter(number, q);

    ws.write(result.join('\n') + '\n');

    ws.end();
}