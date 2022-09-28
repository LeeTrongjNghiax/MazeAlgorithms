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

let mazes = [];

let maze_primAlgMazeGeneratorModified;
let maze2_randomizedDepthFirstSearchMazeGenerator;
let maze3_aldousBroderMazeGenerator;

let pS, wS;

let mazeGenTimeOut;
let mazeGen = function(){
  maze2_randomizedDepthFirstSearchMazeGenerator = randomizedDepthFirstSearchMazeGenerator(
    maze2_randomizedDepthFirstSearchMazeGenerator.maze, 
    maze2_randomizedDepthFirstSearchMazeGenerator.stack
  );

  maze2 = new Maze(
    maze2_randomizedDepthFirstSearchMazeGenerator.maze,
    pS, 
    wS,
    {
      B: wallColor,
      S: startColor,
      E: endColor,
      P: pathColor,
      T: "green"
    },
    maze2_randomizedDepthFirstSearchMazeGenerator.stack
  )
  maze2.draw(ctx);
  mazeGenTimeOut = setTimeout(mazeGen, 500);
}