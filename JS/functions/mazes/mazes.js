mazeInit = () => {
  mazeAlgSpeed = parseFloat (getElement(`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(1) > 
    ul:nth-child(2) > 
    li:nth-child(3) > 
    input
  `).value);
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
    `).value, 
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

  let alg = getElement(`#mazeController > 
    div:nth-child(2) >
    ul:nth-child(1) >
    li:nth-child(1) >
    ul:nth-child(2) >
    li:nth-child(1) >
    select
  `).value;

  mazeAlg = null;
  mazeGen = null;
  clearTimeout(mazeGenTimeOut);

  if (alg == "primModified") {
    mazeAlg = {
      maze: m,
      cells: getFrontierCells(m, initCell, 2)
    }
    mazeGen = function() {
      mazeAlg = primAlgMazeGeneratorModified(
        mazeAlg.maze, 
        mazeAlg.cells
      );
    
      maze = new Maze(
        mazeAlg.maze,
        pS, 
        wS,
        {
          B: wallColor,
          S: startColor,
          E: endColor,
          P: pathColor,
          T: "green"
        },
        mazeAlg.cells
      )
      maze.draw(ctx);
      mazeGenTimeOut = setTimeout(mazeGen, mazeAlgSpeed);
    }
  } else if (alg == "depthDirstSearch") {
    mazeAlg = {
      maze: m,
      stack: [initCell]
    }
    mazeGen = function() {
      mazeAlg = randomizedDepthFirstSearchMazeGenerator(
        mazeAlg.maze, 
        mazeAlg.stack
      );
    
      maze = new Maze(
        mazeAlg.maze,
        pS, 
        wS,
        {
          B: wallColor,
          S: startColor,
          E: endColor,
          P: pathColor,
          T: "green"
        },
        mazeAlg.stack
      )
      maze.draw(ctx);
      mazeGenTimeOut = setTimeout(mazeGen, mazeAlgSpeed);
    }
  } else if (alg == "aldousBroder") {
    mazeAlg = {
      maze: m,
      currentCell: initCell
    }
    mazeGen = function() {
      mazeAlg = aldousBroderMazeGenerator(
        mazeAlg.maze, 
        mazeAlg.currentCell
      );
    
      maze = new Maze(
        mazeAlg.maze,
        pS, 
        wS,
        {
          B: wallColor,
          S: startColor,
          E: endColor,
          P: pathColor,
          T: "green"
        },
        null,
        mazeAlg.currentCell
      )
      maze.draw(ctx);
      mazeGenTimeOut = setTimeout(mazeGen, mazeAlgSpeed);
    }
  }

  mazeGen();
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