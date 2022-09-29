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

let mazeAlg;

let pS, wS;

let mazeAlgSpeed; 
let mazeGenTimeOut;