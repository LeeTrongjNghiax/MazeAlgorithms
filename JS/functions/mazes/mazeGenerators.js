generateMazeFullOfWallsWithCells = size => {
  let maze = Array(size.y).fill().map(
    () => Array(size.x).fill(B)
  );

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (i % 2 != 0 && j % 2 != 0)
        maze[i][j] = P;
    }
  }

  return maze;
}

generateMazeFullOfWalls = size => {
  let maze = Array(size.y).fill().map(
    () => Array(size.x).fill(B)
  );

  return maze;
}

primAlgMazeGeneratorModified = (maze, cells) => {
  // Init
  let neighborsOfRandomCell;

  // Remove duplicate unvisited cells list
  cells = unique( cells, (a, b) => (a.x === b.x) & (a.y === b.y) );

  // Pick a random cell from unvisited cells list.
  let randomCellIndex = randomInt(0, cells.length - 1);
  let randomCell = cells[randomCellIndex];

  if (typeof randomCell !== 'undefined') {
    // Remove it from the unvisited cells list
    cells.splice(randomCellIndex, 1);

    // Get neighbours of random cell
    neighborsOfRandomCell = getNeighbourCells(maze, randomCell, 2);

    // Connect random cell with random neighbour from neighborsOfRandomCell
    if (neighborsOfRandomCell.length != 0) {

      // Pick a random neighbor
      let randomNeighborIndex = randomInt(0, neighborsOfRandomCell.length - 1);

      // Connect the random cell with the neighbor
      let connectedCell = getConnectedCell(
        randomCell, 
        neighborsOfRandomCell[randomNeighborIndex], 2
      );
      if (connectedCell != null) {
        maze[connectedCell.y][connectedCell.x] = P;
        maze[randomCell.y][randomCell.x] = P;
      }
    }
    // Compute the unvisited cells of the chosen random cell and add them to the unvisited cells list.
    let cellsOfRandomCell = getFrontierCells(maze, randomCell, 2);
    cells.push(...cellsOfRandomCell);
  }
  return {maze, cells};
}

randomizedDepthFirstSearchMazeGenerator = (maze, stack) => {
  // While the stack is not empty
  if (stack.length != 0) {
    // Pop a cell from the stack and make it a current cell
    let currentCell = stack.pop();

    let neighborsOfCurrentCell = getFrontierCells(maze, currentCell, 2);
    // If the current cell has any neighbours which have not been visited
    if (neighborsOfCurrentCell.length != 0) {

      // Push the current cell to the stack
      stack.push(currentCell);

      // Choose one of the unvisited neighbours
      let randomIndex = randomInt(0, neighborsOfCurrentCell.length - 1);
      let neighbor = neighborsOfCurrentCell[randomIndex];

      // Remove the wall between the current cell and the chosen cell
      let connectedCell = getConnectedCell(currentCell, neighbor, 2);
      maze[connectedCell.y][connectedCell.x] = P;

      // Mark the chosen cell as visited and push it to the stack
      maze[neighbor.y][neighbor.x] = P;
      stack.push(neighbor)
    }
  }
  return {maze, stack}
}

aldousBroderMazeGenerator = (maze, currentCell) => {
  // While there are unvisited cells
  if (isBlockedCell(maze) && currentCell != null) {

    // Get near by cells of current cell
    let nearbyOfCurrentCell = getNearbyCells(maze, currentCell, null, 2);

    // Pick a random neighbour
    let randomIndex = randomInt(0, nearbyOfCurrentCell.length - 1);
    let neighbor = nearbyOfCurrentCell[randomIndex];

    // If the chosen neighbour has not been visited:
    if (maze[neighbor.y][neighbor.x] == 0) {

      // Remove the wall between the current cell and the chosen neighbour.
      let connectedCell = getConnectedCell(currentCell, neighbor, 2);
      maze[connectedCell.y][connectedCell.x] = P;

      // Mark the chosen neighbour as visited.
      maze[neighbor.y][neighbor.x] = P;
    }

    // Make the chosen neighbour the current cell.
    if (typeof neighbor !== 'undefined') {
      currentCell.x = neighbor.x;
      currentCell.y = neighbor.y;
    } else {
      currentCell = null;
    }
  }
  return {maze, currentCell}
}

binaryTreeMazeGenerator = (maze, currentCell) => {
  if (currentCell == null) return {maze: maze, currentCell: null}

  let leftOrTop = randomInt(0, 1);
  let obj = {x: null, y: null}

  maze[currentCell.y][currentCell.x] = P;
  
  if (currentCell.x == 1 &&
      currentCell.y == 1) {
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x < maze[0].length - 2 &&
      currentCell.y == 1) {
    // if (leftOrTop != 0)
      maze[currentCell.y][currentCell.x - 1] = P;
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x == maze[0].length - 2 &&
      currentCell.y == 1) {
    // if (leftOrTop != 0)
      maze[currentCell.y][currentCell.x - 1] = P;
    obj.x = 1;
    obj.y = currentCell.y + 2;
  } else

  if (currentCell.x == 1 &&
      currentCell.y < maze.length - 2) {
    // if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x < maze[0].length - 2 &&
      currentCell.y < maze.length - 2) {
    if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    else
      maze[currentCell.y][currentCell.x - 1] = P;
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x == maze[0].length - 2 &&
      currentCell.y < maze.length - 2) {
    if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    else
      maze[currentCell.y][currentCell.x - 1] = P;
    obj.x = 1;
    obj.y = currentCell.y + 2;
  } else

  if (currentCell.x == 1 &&
      currentCell.y == maze.length - 2) {
    // if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x < maze[0].length - 2 &&
      currentCell.y == maze.length - 2) {
    if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    else
      maze[currentCell.y][currentCell.x - 1] = P;
    obj.x = currentCell.x + 2;
    obj.y = currentCell.y;
  } else
  if (currentCell.x == maze[0].length - 2 &&
      currentCell.y == maze.length - 2) {
    if (leftOrTop != 1)
      maze[currentCell.y - 1][currentCell.x] = P;
    else
      maze[currentCell.y][currentCell.x - 1] = P;
    obj = null;
  }
  return {maze: maze, currentCell: obj} 
}

huntAndKillMazeGenerator = (maze, currentCell) => {
  let neighborsOfCurrentCell = getFrontierCells(maze, currentCell, 2);

  if (neighborsOfCurrentCell.length != 0) {
    let randomIndex = randomInt(0, neighborsOfCurrentCell.length - 1);
    let nextCell = neighborsOfCurrentCell[randomIndex];
    let connectedCell = getConnectedCell(nextCell, currentCell, 2);

    maze[nextCell.y][nextCell.x] = P;
    maze[connectedCell.y][connectedCell.x] = P;

    currentCell.x = nextCell.x;
    currentCell.y = nextCell.y;
  } else {
    for (let i = 1; i < maze.length; i+=2) {
      for (let j = 1; j < maze[0].length; j+=2) {
        if (maze[j][i] == B) {
          let neighborsOfCurrentCell = getNeighbourCells(maze, {x: i, y: j}, 2);
          if ( neighborsOfCurrentCell.length != 0 ) {
            let randomIndex = randomInt(0, neighborsOfCurrentCell.length - 1);
            let nextCell = neighborsOfCurrentCell[randomIndex];
            let connectedCell = getConnectedCell(nextCell, {x: i, y: j}, 2);

            maze[connectedCell.y][connectedCell.x] = P;
            currentCell.x = i;
            currentCell.y = j;
            maze[currentCell.y][currentCell.x] = P;
            return {maze, currentCell};
          }
        }
      }
    }
  }
  return {maze, currentCell};
}

// Not done yet
sideWinderMazeGenerator = (maze, runSet) => {
  if (runSet.length == 0) return {maze: maze, runSet: []};

  let pathRight = randomInt(0, 1);
  let currentCell = runSet.pop();
 
  if (currentCell.x < maze[0].length - 2 &&
      currentCell.y < maze.length - 2) {
    if (pathRight == 1) {
      maze[currentCell.y][currentCell.x + 1] = P;
      runSet.push({x: currentCell.x + 1, y: currentCell.y}); 
    } else {
      let randomIndex = randomInt(0, runSet.length);
      currentCell = runSet[randomIndex];
      maze[currentCell.y + 1][currentCell.x] = P;
      runSet = [];
      runSet.push({x: currentCell.x, y: currentCell.y + 1})
    }

  } else if (currentCell.x == maze[0].length - 2 &&
             currentCell.y < maze.length - 2) {
    let randomIndex = randomInt(0, runSet.length);
    currentCell = runSet[randomIndex];
    maze[currentCell.y + 1][currentCell.x] = P;
    runSet = [];
    runSet.push({x: currentCell.x, y: currentCell.y + 1})

  } else if (currentCell.x < maze[0].length - 2 &&
            currentCell.y == maze.length - 2) {
    if (pathRight == 1) {
      maze[currentCell.y][currentCell.x + 1] = P;
      runSet.push({x: currentCell.x + 1, y: currentCell.y}); 
    }
    
  } else if (currentCell.x == maze[0].length - 2 &&
            currentCell.y == maze.length - 2) {
    runSet = [];
  } 
  return {maze, runSet};
}

// Not done yet
ellerMazeGenerator = (maze, runSet) => {

}

// Not done yet
krúkalMazeGenerator = (maze, runSet) => {

}