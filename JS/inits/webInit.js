const cv = document.querySelector("#cv");
cv.width = cvSide;
cv.height = cvSide;
const ctx = cv.getContext("2d");

let inpMazeWidth = new InputRange("inpMazeWidth", 199, 3, 299, 2);
let inpMazeHeight = new InputRange("inpMazeHeight", 199, 3, 299, 2);
let inpMazePathSide = new InputRange("inpMazePathSide", 1, 1, 10, 1);
let inpMazeWallSide = new InputRange("inpMazeWallSide", 10, 1, 10, 1);

let inpMazePathColor = new Input("inpMazePathColor", "#ffffff");
let inpMazeWallColor = new Input("inpMazeWallColor", "#000000");
let inpMazeStartColor = new Input("inpMazeStartColor", "#ffff00");
let inpMazeEndColor = new Input("inpMazeEndColor", "#ffffff");

let inpNpc1Speed = new InputRange("inpNpc1Speed", 0, 0, 100, 1);
let inpNpc1Color = new Input("inpNpc1Color", "#FF0000");
let inpNpc1TracingColor = new Input("inpNpc1TracingColor", "#FF0000");

let inpNpc2Speed = new InputRange("inpNpc2Speed", 0, 0, 100, 1);
let inpNpc2Color = new Input("inpNpc2Color", "#FFA500");
let inpNpc2TracingColor = new Input("inpNpc2TracingColor", "#FFA500");

// createMazeForm();