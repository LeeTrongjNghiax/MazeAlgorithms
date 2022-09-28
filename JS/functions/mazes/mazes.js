mazeInit = () => {
  pathRatio =  parseFloat(getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(3) > 
    input
  `).value);
  wallRatio = -parseFloat(getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(4) > 
    input
  `).value);
  
  pathColor = getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(4) > 
    ul:nth-child(2) > 
    li:nth-child(1) > 
    input
  `).value;
  wallColor =  getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(4) > 
    ul:nth-child(2) > 
    li:nth-child(2) > 
    input
  `).value;
  startColor =  getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(4) > 
    ul:nth-child(2) > 
    li:nth-child(3) > 
    input
  `).value;
  endColor =  getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(4) > 
    ul:nth-child(2) > 
    li:nth-child(4) > 
    input
  `).value;
  
  let side = Math.max(
    getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(2) > 
      input
    `).value, 
    getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(1) > 
      input
    `).value
  );
  
  let result = solvingSystemsLinearEquations2Unknowns(
    [ [ (side + 1) / 2, (side - 1) / 2 ], 
      [ wallRatio, pathRatio] ], [ [cvSide], [0] ]
  );

  pS = result.y;
  wS = result.x;
  
  let m = generateMazeFullOfWalls({
    x: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(1) > 
      input
    `).value),
    y: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(2) > 
      input
    `).value)
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
    x: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(1) > 
      input
    `).value),
    y: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(2) > 
      input
    `).value)
  });
  let initCell2 = {
    x: randomOdd(1, m2[0].length - 2), 
    y: randomOdd(1, m2.length - 2)
  };
  m2[initCell2.y][initCell2.x] = P;
  maze2_randomizedDepthFirstSearchMazeGenerator = {
    maze: m2,
    stack: [initCell2]
  }

  let m3 = generateMazeFullOfWalls({
    x: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(1) > 
      input
    `).value),
    y: parseInt(getElement(`#mazeController > 
      div:nth-child(2) > 
      ul:nth-child(1) > 
      li:nth-child(2) > 
      ul:nth-child(2) > 
      li:nth-child(2) > 
      input
    `).value)
  });
  let initCell3 = {
    x: randomOdd(1, m3[0].length - 2), 
    y: randomOdd(1, m3.length - 2)
  };
  m3[initCell3.y][initCell3.x] = P;
  maze3_aldousBroderMazeGenerator = {
    maze: m3,
    currentCell: initCell3
  }

  mazeGen = function(){
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
}

oppositeDirectionOf = direction => {
  if (direction == "U") return "D";
  if (direction == "D") return "U";
  if (direction == "R") return "L";
  if (direction == "L") return "R";
  return null;
}

getNearbyCells = (maze, cell, option = null, distance) => {
  let nearbyCells = [];

  if (cell.y + distance <= maze.length - 1) 
    if (maze[cell.y + distance][cell.x] == option || option == null) 
      nearbyCells.push({x: cell.x, y: cell.y + distance});

  if (cell.y >= distance) 
    if (maze[cell.y - distance][cell.x] == option || option == null) 
      nearbyCells.push({x: cell.x, y: cell.y - distance});

  if (cell.x + distance <= maze[0].length - 1) 
    if (maze[cell.y][cell.x + distance] == option || option == null) 
      nearbyCells.push({x: cell.x + distance, y: cell.y});

  if (cell.x >= distance) 
    if (maze[cell.y][cell.x - distance] == option || option == null) 
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