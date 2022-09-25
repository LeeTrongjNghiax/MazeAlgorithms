const B = 0; // Block
const P = 1; // Path
const S = 2; // Start
const E = 3; // End
const directions = ["U", "D", "L", "R"];

const cvSide = parseFloat(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--cvSide')
      .slice(0, -2) )

let pathRatio;
let wallRatio;

let pathColor;
let wallColor;
let startColor;
let endColor;

let maze;
let maze2;

let player1Speed;
let player1Color;
let player1TracingColor;

let player2Speed;
let player2Color;
let player2TracingColor;

let interval;
let pjTimeOut;

let player;
let player2;

let traceSidePs;
let traceSideWs;

let trace = [];
let trace2 = [];

let maze_primAlgMazeGeneratorModified;
let maze2_primAlgMazeGenerator;

let pS, wS;