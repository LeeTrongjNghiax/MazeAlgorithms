const cv = document.querySelector("#cv");
cv.width = cvSide;
cv.height = cvSide;
const ctx = cv.getContext("2d");

let slMazeGenerationAlgorithm_values = [
  {
    name: "DFS Iterative",
    acronym: "DFSI"
  },
  {
    name: "DFS Recursive",
    acronym: "DFSR"
  },
  {
    name: "Randomized Kruskal",
    acronym: "RK"
  },
  {
    name: "Randomized Prim",
    acronym: "RP"
  },
  {
    name: "Wilson",
    acronym: "W"
  },
  {
    name: "Aldous-Broder Recursive",
    acronym: "ABR"
  },
  {
    name: "Aldous-Broder Simple",
    acronym: "ABS"
  },
  {
    name: "Cellular Automaton",
    acronym: "CA"
  },
];

let slMazeStartPosition_values = [
  {
    name: "Random",
    acronym: "Rand"
  },
  {
    name: "Top",
    acronym: "T"
  },
  {
    name: "Bottom",
    acronym: "B"
  },
  {
    name: "Left",
    acronym: "L"
  },
  {
    name: "Right",
    acronym: "R"
  },
  {
    name: "Top or Bottom",
    acronym: "TB"
  },
  {
    name: "Right or Left",
    acronym: "RL"
  },
];
let slMazeEndPosition_values = [
  {
    name: "Random",
    acronym: "Rand"
  },
  {
    name: "Top",
    acronym: "T"
  },
  {
    name: "Bottom",
    acronym: "B"
  },
  {
    name: "Left",
    acronym: "L"
  },
  {
    name: "Right",
    acronym: "R"
  },
  {
    name: "Top or Bottom",
    acronym: "TB"
  },
  {
    name: "Right or Left",
    acronym: "RL"
  },
  {
    name: "Same as Start",
    acronym: "SAS"
  },
  {
    name: "Opposite as Start",
    acronym: "OAS"
  },
  {
    name: "To the left of Start",
    acronym: "LOS"
  },
  {
    name: "To the right of Start",
    acronym: "ROS"
  },
];

let inpMazeWidth = new InputRange(5, 3, 299, 2);
let inpMazeHeight = new InputRange(5, 3, 299, 2);
let inpMazePathSide = new InputRange(1, 1, 10, 1);
let inpMazeWallSide = new InputRange(10, 1, 10, 1);

let inpMazePathColor = new Input("#202020");
let inpMazeWallColor = new Input("#000000");
let inpMazeStartColor = new Input("#202020");
let inpMazeEndColor = new Input("#ffffff");

let inpNpc1Speed = new InputRange(0, 0, 100, 1);
let inpNpc1Color = new Input("#FF0000");
let inpNpc1TracingColor = new Input("#FF0000");

let inpNpc2Speed = new InputRange(0, 0, 100, 1);
let inpNpc2Color = new Input("#FFA500");
let inpNpc2TracingColor = new Input("#FFA500");