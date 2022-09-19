const B = 0; // Block
const P = 1; // Path
const S = 2; // Start
const E = 3; // End

class Player{
  constructor(side, positions, pointTo, speeds, color) {
    this.side = side;
    this.positions = positions;
    this.pointTo = pointTo; //U, D, L, R
    this.speeds = speeds;
    this.color = color;

    this.originalPositions = {x: 0, y: 0};
    this.originalPositions.x = positions.x;
    this.originalPositions.y = positions.y;
    this.originalPointTo = "";
    this.originalPointTo = pointTo;
  }
  draw(ctx, wS, pS) {
    let x1, x2, x3, y1, y2, y3;
 
    switch (this.pointTo) {
      case "U": 
        x1 = -1; x2 = 1; x3 =  0;
        y1 =  1; y2 = 1; y3 = -1;
        break;
      case "D": 
        x1 = -1; x2 =  1; x3 = 0;
        y1 = -1; y2 = -1; y3 = 1;
        break;
      case "L": 
        x1 =  1; x2 = 1; x3 = -1;
        y1 = -1; y2 = 1; y3 =  0;
        break;
      case "R": 
        x1 = -1; x2 = -1; x3 = 1;
        y1 = -1; y2 =  1; y3 = 0;
        break;
    }
    ctx.beginPath();
    ctx.moveTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x1), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y1), 
    );
    ctx.lineTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x2), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y2), 
    );
    ctx.lineTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x3), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y3), 
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  rotate(option) {
    switch (option) {
      case "L":
        switch (this.pointTo) {
          case "U": this.pointTo = "L"; break;
          case "L": this.pointTo = "D"; break;
          case "D": this.pointTo = "R"; break;
          case "R": this.pointTo = "U"; break;
        }
        break;
      case "R":
        switch (this.pointTo) {
          case "U": this.pointTo = "R"; break;
          case "R": this.pointTo = "D"; break;
          case "D": this.pointTo = "L"; break;
          case "L": this.pointTo = "U"; break;
        }
        break;
    }
  }
  move() {
    switch (this.pointTo) {
      case "U": 
        this.positions.y -= 1; 
        break;
      case "D": 
        this.positions.y += 1; 
        break;
      case "R": 
        this.positions.x += 1; 
        break;
      case "L": 
        this.positions.x -= 1; 
        break;
    }
  }
  goOneStep(move) {
    switch (move) {
      case "R": this.rotate("R"); break;
      case "L": this.rotate("L"); break;
      case "M": this.move(); break;
      case "RM": this.rotate("R"); this.move(); break;
      case "LM": this.rotate("L"); this.move(); break;
      case "RRM": this.rotate("R"); this.rotate("R"); this.move(); break;
      case "LLM": this.rotate("L"); this.rotate("L"); this.move(); break;
      default: break;
    }
  }
  go(solution) {
    for (let i = 0; i < solution.length; i++) {
      switch (solution[i]) {
        case "R": this.rotate("R"); break;
        case "L": this.rotate("L"); break;
        case "M": this.move(); break;
      }
    }
  }
  reset() {
    this.positions.x = this.originalPositions.x;
    this.positions.y = this.originalPositions.y;
    this.pointTo = this.originalPointTo;
  }
}

class Maze{
  constructor(content, pS, wS, colors) {
    this.content = content;
    this.pS = pS;
    this.wS = wS;
    this.colors = colors;
  }
  setEntrance(position, option) {
    this.content[position.y][position.x] = option;
  }
  getPosition(option) {
    for (let i = 0; i < this.content.length; i++) {
      for (let j = 0; j < this.content[i].length; j++) {
        if (this.content[i][j] == option) return {x: j, y: i};
      }  
    }
  }
  markOnSquare(ctx, position, txt) {
    let x;
    txt.content = txt.content.toString();
  
    switch (txt.content.length) {
      case 1: x = 2; break;
      case 2: x = 1; break;
      case 3: x = 0.6; break;
    }
  
    ctx.font = `${txt.size * 2}px ${txt.fontFamily}`;
    ctx.fillStyle = `${txt.color}`;
    ctx.fillText(txt.content, (position.x - txt.size / x), (position.y + txt.size / 2));
  }
  markAllMaze(ctx, txt) {
    const {content, pS, wS} = this;
  
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        txt.content = (i * content[i].length) + j
        this.markOnSquare(
          ctx,
          {
            x: (j / 2) * (wS + pS) + (wS / 2),
            y: (i / 2) * (wS + pS) + (wS / 2)
          },
          txt
        );
      }
    }
  }
  draw(ctx) {
    const {content, pS, wS, colors} = this;
  
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        switch (content[i][j]) {
          case B: case -1:
            ctx.fillStyle = colors.B;
            break;
          case S:
            ctx.fillStyle = colors.S;
            break;
          case E:
            ctx.fillStyle = colors.E;
            break;
          default:
            ctx.fillStyle = colors.P;
        }
        if ((i % 2 == 0) && (j % 2 == 0))
          ctx.fillRect((j / 2) * (wS + pS), (i / 2) * (wS + pS), wS, wS);

        else if ((i % 2 != 0) && (j % 2 != 0)) 
          ctx.fillRect(((j - 1)/ 2) * (wS + pS) + wS, ((i - 1) / 2) * (wS + pS) + wS, pS, pS);

        else if (i % 2 != 0 && j % 2 == 0) 
          ctx.fillRect((j / 2) * (wS + pS), ((i - 1) / 2) * (wS + pS) + wS, wS, pS);
          
        else if (i % 2 == 0 && j % 2 != 0) 
          ctx.fillRect(((j - 1) / 2) * (wS + pS) + wS, (i / 2) * (wS + pS), pS, wS);
      }
    }
  }
}

const cvSide = 700;
const cv = document.querySelector("#cv");
cv.width = cvSide;
cv.height = cvSide;
const ctx = cv.getContext("2d");

// 1/1 -> -> lmao = 1
// 1/2 -> -> lmao = 0.7
// 1/3 -> -> lmao = 0.54
// 1/4 -> -> lmao = 0.44
// Dec -> ->        Dec

let m = primAlgMazeGenerator({x: 21, y: 21});

let side = Math.max(m.length, m[0].length)
let sum = cvSide / ((side - 1) / 2);
let wallRatio = -4;
let pathRatio = 1;

let result = solvingSystemsLinearEquations2Unknowns(
  [ [ (side + 1) / 2, (side - 1) / 2 ], 
    [ wallRatio, pathRatio] ], [ [cvSide], [0] ]
);
let pS = result.y;
let wS = result.x;

let maze = new Maze(
  m,
  pS, 
  wS,
  {
    B: "black",
    S: "yellow",
    E: "white",
    P: "#202020"
    // P: "#fafafa"
  },
)

let directions = ["U", "D", "L", "R"];

let startPosition = directions[randomInt(0, directions.length - 1)];
let start = getRandomEntrancePosition(
  maze.content, 
  startPosition, 
  B
);
maze.setEntrance(start, S);

let endPosition = directions[randomInt(0, directions.length - 1)];
if (maze.content.length == 3 || maze.content[0].length == 3 ||
    maze.content.length == 5 || maze.content[0].length == 5) {
  while (endPosition.localeCompare(startPosition) == 0)
    endPosition = directions[randomInt(0, directions.length - 1)];
}
let end = getRandomEntrancePosition(
  maze.content, 
  endPosition,
  B
)
maze.setEntrance(end, E);

let player = new Player(
  maze.wS * 0.75, 
  {
    x: maze.getPosition(S).x, 
    y: maze.getPosition(S).y
  }, 
  start.pointTo, 
  10, 
  "orange"
);

let player2 = new Player(
  maze.wS * 0.75, 
  {
    x: maze.getPosition(S).x, 
    y: maze.getPosition(S).y
  }, 
  start.pointTo, 
  10, 
  "red"
);

let interval = 0;
let pjTimeOut;
let pjSpeed = 500;

let traceSidePs = (maze.pS / 3) / 3 * 2;
let traceSideWs = (maze.wS / 3) / 3 * 2;

let trace = [];
for (let i = 0; i < maze.content.length; i++) {
  trace[i] = [];
  for (let j = 0; j < maze.content[i].length; j++) {
    trace[i][j] = '0000000000000000';
  }
}

let trace2 = [];
for (let i = 0; i < maze.content.length; i++) {
  trace2[i] = [];
  for (let j = 0; j < maze.content[i].length; j++) {
    trace2[i][j] = '0000000000000000';
  }
}

// let solution = wallFollowerAlg(player, maze, "R").split('')

// let playerJourney = function(solution) {
//   if (interval < solution.length) {
//     player.goOneStep(solution[interval]);
//     sleep(100);
//   }
//   pjTimeOut = setTimeout(playerJourney, pjSpeed);
//   interval++;
// }