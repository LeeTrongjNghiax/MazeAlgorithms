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

primAlgMazeGenerator = (maze, walls) => {
  // Init
  let neighborCellsOfRandomWall = [];

  // Remove duplicate walls list
  walls = unique( walls, (a, b) => (a.x === b.x) & (a.y === b.y) );

  // Pick a random wall from walls list.
  let randomWallIndex = randomInt(0, walls.length - 1);
  let randomWall = walls[randomWallIndex];

  if (typeof randomWall !== 'undefined') {
    // Remove it from the walls list
    walls.splice(randomWallIndex, 1);

    neighborCellsOfRandomWall = getNeighbourCellsFromWall(maze, randomWall);

    if (neighborCellsOfRandomWall != null) {
      // Make the wall a passage
      maze[randomWall.y][randomWall.x] = P;

      // Get random neighbor cell
      let randomNeighborIndex = randomInt(0, neighborCellsOfRandomWall.length - 1);

      // Mark the unvisited cell as part of the maze.
      let nextCell = getNextCell(
        neighborCellsOfRandomWall[randomNeighborIndex],
        randomWall,
      );
      maze[nextCell.y][nextCell.x] = P;

      // Compute the walls of that cell and add them to the walls list.
      let wallsOfrandomNeighborCell = getFrontierCells(maze, nextCell, 1);
      walls.push(...wallsOfrandomNeighborCell);
    }
  }
  return {maze, walls};
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

randomizedDepthFirstSearchMazeGenerator = size => {

}