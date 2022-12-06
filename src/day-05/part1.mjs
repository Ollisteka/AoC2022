import { readToString } from "./stdin.mjs";

async function solve() {
  const input = await readToString().then(res => res
    .split("\n")
    .map(i => i.replace('\r', '')));

  let stacksCount = 0;
  let idx = 0;

  while (true) {
    const line = input[idx];
    if (line.startsWith(' 1'))  {
      stacksCount = line.split('   ').length;
      idx += 2;
      break;
    }
    idx++;
  } 

  const stacks = new Array();

  for (let lineNumber = idx - 2 - 1; lineNumber >= 0; lineNumber--) {
    let stack = 0;
    const lineWithCrates = input[lineNumber];
    for (let i = 0; i < lineWithCrates.length; i += 4) {
      const crate = lineWithCrates.slice(i, i+4).trim();
      if (crate) {
        if (!stacks[stack]) {
          stacks[stack] = [];
        }
        stacks[stack].push(crate[1]);
      } 
      stack++;
    }
    continue;
  }

  const regexp  = /move (?<count>\d+) from (?<source>\d+) to (?<dest>\d+)/

  for (let i = idx; i < input.length; i++) {
    const line = input[i];
    if (!line) {
      break;
    }
    const match = line.match(regexp);
    const {count, source, dest} = match.groups;
    const [startOfArray, endOfArray] = removeFromArray(stacks[source-1], count);
    stacks[source-1] = [...startOfArray];
    stacks[dest-1] = [...stacks[dest-1], ...endOfArray]
  }

  return stacks.map(stack => stack[stack.length - 1]).join('');
 
}

function removeFromArray(array, count) {
   const endOfArray = array.slice(-count).reverse();
   const startOfArray = array.slice(0, -count);
   return [startOfArray, endOfArray];
}

solve().then(console.log);