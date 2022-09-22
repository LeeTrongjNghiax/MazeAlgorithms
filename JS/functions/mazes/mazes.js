mazeInit = () => {
  m = primAlgMazeGenerator({
    x: parseFloat(getElement("#inpMazeWidth").value), 
    y: parseFloat(getElement("#inpMazeHeight").value)
  });
  
  pathRatio =  parseFloat(getElement("#inpMazePathSide").value);
  wallRatio = -parseFloat(getElement("#inpMazeWallSide").value);
  
  pathColor = getElement("#inpMazePathColor").value;
  wallColor = getElement("#inpMazeWallColor").value;
  startColor = getElement("#inpMazeStartColor").value;
  endColor = getElement("#inpMazeEndColor").value;
  
  player1Speed = parseFloat(getElement("#inpNpc1Speed").value);
  player1Color = getElement("#inpNpc1Color").value;
  player1TracingColor = getElement("#inpNpc1TracingColor").value;
  
  player2Speed = parseFloat(getElement("#inpNpc2Speed").value);
  player2Color = getElement("#inpNpc2Color").value;
  player2TracingColor = getElement("#inpNpc2TracingColor").value;
  
  let side = Math.max(m.length, m[0].length);
  
  let result = solvingSystemsLinearEquations2Unknowns(
    [ [ (side + 1) / 2, (side - 1) / 2 ], 
      [ wallRatio, pathRatio] ], [ [cvSide], [0] ]
  );
  console.log(result);

  let pS = result.y;
  let wS = result.x;
  
  maze = new Maze(
    m,
    pS, 
    wS,
    {
      B: wallColor,
      S: startColor,
      E: endColor,
      P: pathColor
    },
  )
  
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
  
  player = new Player(
    maze.wS * 0.75, 
    {
      x: maze.getPosition(S).x, 
      y: maze.getPosition(S).y
    }, 
    start.pointTo, 
    player1Speed, 
    player1Color
  );
  
  player2 = new Player(
    maze.wS * 0.75, 
    {
      x: maze.getPosition(S).x, 
      y: maze.getPosition(S).y
    }, 
    start.pointTo, 
    player2Speed, 
    player2Color
  );
  
  interval = 0;
  
  traceSidePs = (maze.pS / 3) / 3 * 2;
  traceSideWs = (maze.wS / 3) / 3 * 2;
  
  trace = [];
  for (let i = 0; i < maze.content.length; i++) {
    trace[i] = [];
    for (let j = 0; j < maze.content[i].length; j++) {
      trace[i][j] = '0000000000000000';
    }
  }
  
  trace2 = [];
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
}

oppositeDirectionOf = direction => {
  if (direction == "U") return "D";
  if (direction == "D") return "U";
  if (direction == "R") return "L";
  if (direction == "L") return "R";
  return null;
}

getNearbyCells = (maze, cell, option, distance) => {
  let nearbyCells = [];

  if (cell.y + distance <= maze.length - 1) 
    if (maze[cell.y + distance][cell.x] == option) 
      nearbyCells.push({x: cell.x, y: cell.y + distance});

  if (cell.y >= distance) 
    if (maze[cell.y - distance][cell.x] == option) 
      nearbyCells.push({x: cell.x, y: cell.y - distance});

  if (cell.x + distance <= maze[0].length - 1) 
    if (maze[cell.y][cell.x + distance] == option) 
      nearbyCells.push({x: cell.x + distance, y: cell.y});

  if (cell.x >= distance) 
    if (maze[cell.y][cell.x - distance] == option) 
      nearbyCells.push({x: cell.x - distance, y: cell.y});

  return nearbyCells;
}

getFrontierCells = (maze, cell, distance) => getNearbyCells(maze, cell, 0, distance);

getNeighbourCells = (maze, cell, distance) => getNearbyCells(maze, cell, 1, distance);

getConnectedCell = (cell1, cell2, distance) => {
  if (cell1.x + distance == cell2.x && cell1.y == cell2.y) 
    return {x: (cell1.x + cell2.x) / 2, y: cell1.y}

  if (cell2.x + distance == cell1.x && cell1.y == cell2.y) 
    return {x: (cell1.x + cell2.x) / 2, y: cell1.y}

  if (cell2.x == cell1.x && cell1.y + distance == cell2.y) 
    return {x: cell1.x, y: (cell1.y + cell2.y) / 2}

  if (cell2.x == cell1.x && cell1.y - distance == cell2.y) 
    return {x: cell1.x, y: (cell1.y + cell2.y) / 2}

  return null;
}

getRandomEntrancePosition = (maze, direction, exclude = B) => {
  let x, y;

  switch (direction) {
    case "U":
      y = 0;
      x = randomInt(1, maze[0].length - 2);
      while (maze[y + 1][x] == exclude)
        x = randomInt(1, maze[0].length - 2);
      break;
    case "D":
      y = maze.length - 1;
      x = randomInt(1, maze[0].length - 2);
      while (maze[y - 1][x] == exclude)
        x = randomInt(1, maze[0].length - 2);
      break;
    case "L":
      y = randomInt(1, maze.length - 2);
      x = 0;
      while (maze[y][x + 1] == exclude)
        y = randomInt(1, maze.length - 2);
      break;
    case "R":
      y = randomInt(1, maze.length - 2);
      x = maze[0].length - 1;
      while (maze[y][x - 1] == exclude)
        y = randomInt(1, maze.length - 2);
      break;
  }

  return {x, y, pointTo: oppositeDirectionOf(direction)};
}