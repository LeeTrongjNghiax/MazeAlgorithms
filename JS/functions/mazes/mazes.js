mazeInit = () => {
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
  
  let side = Math.max(
    getElement("#inpMazeHeight").value, 
    getElement("#inpMazeWidth").value
  );
  
  let result = solvingSystemsLinearEquations2Unknowns(
    [ [ (side + 1) / 2, (side - 1) / 2 ], 
      [ wallRatio, pathRatio] ], [ [cvSide], [0] ]
  );

  pS = result.y;
  wS = result.x;
  
  let m = generateMazeFullOfWalls({
    x: parseInt(getElement("#inpMazeHeight").value),
    y: parseInt(getElement("#inpMazeWidth").value)
  });
  let initCell = {
    x: randomOdd(1, m[0].length - 2), 
    y: randomOdd(1, m.length - 2)
  };
  m[initCell.y][initCell.x] = P;
  maze_primAlgMazeGeneratorModified = {
    maze: m,
    cells: getFrontierCells(m, initCell, 2)
  }

  let m2 = generateMazeFullOfWalls({
    x: parseInt(getElement("#inpMazeHeight").value),
    y: parseInt(getElement("#inpMazeWidth").value)
  });
  m2 = setBoundaries(m2, -1);
  let initCell2 = {
    x: randomOdd(1, m2[0].length - 2), 
    y: randomOdd(1, m2.length - 2)
  };
  m2[initCell2.y][initCell2.x] = P;
  maze2_randomizedDepthFirstSearchMazeGenerator = {
    maze: m2,
    stack: [initCell2]
  }

  // let startPosition = directions[randomInt(0, directions.length - 1)];
  // let start = maze.getRandomEntrancePosition(
  //   startPosition,
  //   [B],
  // )
  // maze.setEntrance(start, S);
  
  // let endPosition = directions[randomInt(0, directions.length - 1)];
  // if (maze.content.length == 3 || maze.content[0].length == 3 ||
  //     maze.content.length == 5 || maze.content[0].length == 5) {
  //   while (endPosition.localeCompare(startPosition) == 0)
  //     endPosition = directions[randomInt(0, directions.length - 1)];
  // }
  // let end = maze.getRandomEntrancePosition(
  //   endPosition,
  //   [B],
  //   [S]
  // )
  // maze.setEntrance(end, E);
  
  // player = new Player(
  //   maze.wS * 0.75, 
  //   {
  //     x: maze.getPosition(S).x, 
  //     y: maze.getPosition(S).y
  //   }, 
  //   start.pointTo, 
  //   player1Speed, 
  //   player1Color
  // );
  
  // player2 = new Player(
  //   maze.wS * 0.75, 
  //   {
  //     x: maze.getPosition(S).x, 
  //     y: maze.getPosition(S).y
  //   }, 
  //   start.pointTo, 
  //   player2Speed, 
  //   player2Color
  // );

  // w = new WallFollowerAlgTrace(maze, player);
  
  // traceSidePs = (maze.pS / 3) / 3 * 2;
  // traceSideWs = (maze.wS / 3) / 3 * 2;
  
  // trace = [];
  // for (let i = 0; i < maze.content.length; i++) {
  //   trace[i] = [];
  //   for (let j = 0; j < maze.content[i].length; j++) {
  //     trace[i][j] = '0000000000000000';
  //   }
  // }
  
  // trace2 = [];
  // for (let i = 0; i < maze.content.length; i++) {
  //   trace2[i] = [];
  //   for (let j = 0; j < maze.content[i].length; j++) {
  //     trace2[i][j] = '0000000000000000';
  //   }
  // }

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
  if (cell1.x + distance == cell2.x && cell1.y == cell2.y ||
      cell1.x - distance == cell2.x && cell1.y == cell2.y) 
    return {x: (cell1.x + cell2.x) / 2, y: cell1.y}

  if (cell2.x == cell1.x && cell1.y + distance == cell2.y ||
      cell2.x == cell1.x && cell1.y - distance == cell2.y) 
    return {x: cell1.x, y: (cell1.y + cell2.y) / 2}

  return null;
}

getNextCell = (cell1, cell2) => {
  if (cell1.x + 1 == cell2.x && cell1.y == cell2.y) 
    return {x: cell1.x + 2, y: cell1.y}

  if (cell1.x - 1 == cell2.x && cell1.y == cell2.y) 
    return {x: cell1.x - 2, y: cell1.y}

  if (cell2.x == cell1.x && cell1.y + 1 == cell2.y) 
    return {x: cell1.x, y: cell1.y + 2}

  if (cell2.x == cell1.x && cell1.y - 1 == cell2.y) 
    return {x: cell1.x, y: cell1.y - 2}

  return null;
}

getNeighbourCellsFromWall = (maze, wall) => {
  let neighbourCells = [];
  
  if (wall.x % 2 != 0 && wall.y % 2 == 0) {
    if (wall.y - 1 > 0)
      if (maze[wall.y - 1][wall.x] == 1) 
        neighbourCells.push({x: wall.x, y: wall.y - 1})

    if (wall.y + 1 < maze[0].length - 1)
      if (maze[wall.y + 1][wall.x] == 1) 
        neighbourCells.push({x: wall.x, y: wall.y + 1})
  }
  if (wall.x % 2 == 0 && wall.y % 2 != 0) {
    if (wall.x - 1 > 0) 
      if (maze[wall.y][wall.x - 1] == 1) 
        neighbourCells.push({x: wall.x - 1, y: wall.y})

    if (wall.x + 1 < maze.length - 1) 
      if (maze[wall.y][wall.x + 1] == 1) 
        neighbourCells.push({x: wall.x + 1, y: wall.y})
  }
  
  return neighbourCells;
}

setBoundaries = (maze, option) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (i == 0 || i == maze.length - 1 ||
          j == 0 || j == maze[i].length - 1)
        maze[i][j] = option;
    }
  }
  return maze;
}