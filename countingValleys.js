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
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */

function countingValleys(steps, path) {
    let currentLevel = 0;
    let inValley = false;
    let valleys = 0;
    let prevLevel;
    
    for (let i = 0; i < steps; i++) {
        if (path[i] === 'D') {
            prevLevel = currentLevel;
            currentLevel--;
            if (prevLevel >= 0 && currentLevel < 0) {
                inValley = true;
                valleys++;
            }
        }
        if (path[i] === 'U') {
            currentLevel++; 
            if (currentLevel >= 0 && inValley) {
                inValley = false;
            } 
        }
    }
    return valleys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const steps = parseInt(readLine().trim(), 10);

    const path = readLine();

    const result = countingValleys(steps, path);

    ws.write(result + '\n');

    ws.end();
}
