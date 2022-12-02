import { readToString } from "./stdin.mjs";

const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';


const LOST_SCORE = 0;
const DRAW_SCORE = 3;
const WON_SCORE = 6;

const mapOpponent = {
  ['A']: ROCK,
  ['B']: PAPER,
  ['C']: SCISSORS
}

const mapMe = {
  ['X']: LOST_SCORE,
  ['Y']: DRAW_SCORE,
  ['Z']: WON_SCORE
}

const scoresForShape = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3
}

async function solve() {
  const input = await readToString().then(res => res
    .trim()
    .split("\n")
    .map(i => i.split(' ').map(x => x.replace('\r', ''))));

  let score = 0;

  for (const [opponent, me] of input) {
    const opponentShape = mapOpponent[opponent];
    const endOfRound = mapMe[me];

    let myShape;

    switch (endOfRound) {
      case LOST_SCORE:
        myShape = opponentShape === SCISSORS ? PAPER : (opponentShape === PAPER ? ROCK : SCISSORS);
        break;
      case DRAW_SCORE:
        myShape = opponentShape;
        break;
      case WON_SCORE:
        myShape = opponentShape === SCISSORS ? ROCK : (opponentShape === PAPER ? SCISSORS : PAPER);
        break;
    }

    score += scoresForShape[myShape];
    score += endOfRound;
  }

  return score;

}

solve().then(console.log);