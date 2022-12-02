import { readToString } from "./stdin.mjs";

const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

const scoresForShape = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3
}

const mapOpponent = {
  ['A']: ROCK,
  ['B']: PAPER,
  ['C']: SCISSORS
}

const mapMe = {
  ['X']: ROCK,
  ['Y']: PAPER,
  ['Z']: SCISSORS
}

const LOST_SCORE = 0;
const DRAW_SCORE = 3;
const WON_SCORE = 6;

async function solve() {
  const input = await readToString().then(res => res
    .trim()
    .split("\n")
    .map(i => i.split(' ').map(x => x.replace('\r', ''))));

  let score = 0;

  for (const [opponent, me] of input) {
    const opponentShape = mapOpponent[opponent];
    const myShape = mapMe[me];

    score += scoresForShape[myShape];

    if (opponentShape === myShape) {
      score += DRAW_SCORE;
      continue;
    }

    if ((myShape === ROCK && opponentShape === SCISSORS)
      || (myShape === PAPER && opponentShape === ROCK)
      || (myShape === SCISSORS && opponentShape === PAPER)) {
      score += WON_SCORE;
      continue;
    }
  }

  return score;

}

solve().then(console.log);