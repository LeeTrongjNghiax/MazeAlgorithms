document.querySelector(".newMaze").addEventListener("click", () => mazeInit());

document.querySelector("#mazeSwitch").addEventListener("click", () => {
  if (document.querySelector("#mazeControllerContent").style.display == "none")
    document.querySelector("#mazeControllerContent").style.display = "block";
  else
    document.querySelector("#mazeControllerContent").style.display = "none";
});

document.querySelector("#npc1Switch").addEventListener("click", () => {
  if (document.querySelector("#ncp1ControllerContent").style.display == "none")
    document.querySelector("#ncp1ControllerContent").style.display = "block";
  else
    document.querySelector("#ncp1ControllerContent").style.display = "none";
});

document.querySelector("#npc2Switch").addEventListener("click", () => {
  if (document.querySelector("#ncp2ControllerContent").style.display == "none") {
    document.querySelector("#ncp2ControllerContent").style.display = "block";
    console.log("1");
  } else if (document.querySelector("#ncp2ControllerContent").style.display == "block") {
    document.querySelector("#ncp2ControllerContent").style.display = "none";
    console.log("2");
  }
});

document.querySelector("#npc2Switch").addEventListener("click", () => {
  document.querySelector("#ncp2ControllerContent").style.display = "block";
});

document.querySelector("#inpMazeWidth").addEventListener("change", () => {
  document.querySelector("#resultMazeWidth").innerHTML = 
  document.querySelector("#inpMazeWidth").value;
});
document.querySelector("#inpMazeHeight").addEventListener("change", () => {
  document.querySelector("#resultMazeHeight").innerHTML = 
  document.querySelector("#inpMazeHeight").value;
});

document.querySelector("#inpMazePathSide").addEventListener("change", () => {
  document.querySelector("#resultMazePathSide").innerHTML = 
  document.querySelector("#inpMazePathSide").value;
});
document.querySelector("#inpMazeWallSide").addEventListener("change", () => {
  document.querySelector("#resultMazeWallSide").innerHTML = 
  document.querySelector("#inpMazeWallSide").value;
});

document.querySelector("#inpMazePathColor").addEventListener("change", () => {
  maze.colors.P = document.querySelector("#inpMazePathColor").value;
  document.querySelector("#resultMazePathColor").innerHTML = 
  document.querySelector("#inpMazePathColor").value;
});
document.querySelector("#inpMazeWallColor").addEventListener("change", () => {
  maze.colors.B = document.querySelector("#inpMazeWallColor").value;
  document.querySelector("#resultMazeWallColor").innerHTML = 
  document.querySelector("#inpMazeWallColor").value;
});

document.querySelector("#inpMazeStartColor").addEventListener("change", () => {
  maze.colors.S = document.querySelector("#inpMazeStartColor").value;
  document.querySelector("#resultMazeStartColor").innerHTML = 
  document.querySelector("#inpMazeStartColor").value;
});
document.querySelector("#inpMazeEndColor").addEventListener("change", () => {
  maze.colors.E = document.querySelector("#inpMazeEndColor").value;
  document.querySelector("#resultMazeEndColor").innerHTML = 
  document.querySelector("#inpMazeEndColor").value;
});

document.querySelector("#inpNpc1Speed").addEventListener("change", () => {
  player.speed = document.querySelector("#inpNpc1Speed").value;
  document.querySelector("#resultNpc1Speed").innerHTML = 
  document.querySelector("#inpNpc1Speed").value;
});
document.querySelector("#inpNpc1Color").addEventListener("change", () => {
  player.color = document.querySelector("#inpNpc1Color").value;
  document.querySelector("#resultNpc1Color").innerHTML = 
  document.querySelector("#inpNpc1Color").value;
});
document.querySelector("#inpNpc1TracingColor").addEventListener("change", () => {
  player1TracingColor = document.querySelector("#inpNpc1TracingColor").value;
  document.querySelector("#resultNpc1TracingColor").innerHTML = 
  document.querySelector("#inpNpc1TracingColor").value;
});

document.querySelector("#inpNpc2Speed").addEventListener("change", () => {
  player2.speed = document.querySelector("#inpNpc2Speed").value;
  document.querySelector("#resultNpc2Speed").innerHTML = 
  document.querySelector("#inpNpc2Speed").value;
});
document.querySelector("#inpNpc2Color").addEventListener("change", () => {
  player2.color = document.querySelector("#inpNpc2Color").value;
  document.querySelector("#resultNpc2Color").innerHTML = 
  document.querySelector("#inpNpc2Color").value;
});
document.querySelector("#inpNpc2TracingColor").addEventListener("change", () => {
  player2TracingColor = document.querySelector("#inpNpc2TracingColor").value;
  document.querySelector("#resultNpc2TracingColor").innerHTML = 
  document.querySelector("#inpNpc2TracingColor").value;
});