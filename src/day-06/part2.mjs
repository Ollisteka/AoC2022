import { readToString } from "./stdin.mjs";

const MARKER_LENGTH = 14;

async function solve() {
  const input = await readToString().then(res => res.trim('\r\n'));

  for (let i = 0; i < input.length; i++) {
    const possibleMarker = input.substring(i, i + MARKER_LENGTH).split('');
    if (new Set(possibleMarker).split('').size === MARKER_LENGTH) {
      return i + MARKER_LENGTH;
    }    
  }
}

solve().then(console.log);