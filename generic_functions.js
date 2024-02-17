"use strict";
function convertBinToHex(binNum) {
    const lookupTable = new Map([
        ["0000", "0"],
        ["0001", "1"],
        ["0010", "2"],
        ["0011", "3"],
        ["0100", "4"],
        ["0101", "5"],
        ["0110", "6"],
        ["0111", "7"],
        ["1000", "8"],
        ["1001", "9"],
        ["1010", "a"],
        ["1011", "b"],
        ["1100", "c"],
        ["1101", "d"],
        ["1110", "e"],
        ["1111", "f"]
    ]);

    binNum = binNum.toLowerCase().replace("0b", "");

    const hexDigits = Math.ceil(binNum.length / 4);
    const leadingZeros = (hexDigits * 4) - binNum.length;
    for(let i = 0; i < leadingZeros; i++) {binNum = "0" + binNum;}

    let hexNum = "0x";
    for(let i = 0; i < hexDigits; i++) {
        const binSet = binNum.slice(i * 4, (i * 4) + 4);
        hexNum += lookupTable.get(binSet);
    }

    return(hexNum);
}

function convertHexToBin(hexNum) {
    const lookupTable = new Map([
        ["0", "0000"],
        ["1", "0001"],
        ["2", "0010"],
        ["3", "0011"],
        ["4", "0100"],
        ["5", "0101"],
        ["6", "0110"],
        ["7", "0111"],
        ["8", "1000"],
        ["9", "1001"],
        ["a", "1010"],
        ["b", "1011"],
        ["c", "1100"],
        ["d", "1101"],
        ["e", "1110"],
        ["f", "1111"]
    ]);

    hexNum = hexNum.toLowerCase().replace("0x", "");

    let binNum = "0b";
    for(let i = 0; i < hexNum.length; i++) {
        const hexDigit = hexNum.at(i);
        const binSet = lookupTable.get(hexDigit);
        binNum += binSet;
    }

    return(binNum)
}

// Adds two arrays together
// ([10,9,8] + [1,0,-1] = [11, 9, 7])
function addArrays(ar1, ar2) {
    let result = [];
    for(let i = 0; i < ar1.length; i++) {
        result.push(ar1[i] + ar2[i]);
    }
    //console.log(`The sum of the two arrays is: ${result}`);
    return(result);
}

// Copied from https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText.
async function writeToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error(error.message);
    }
}