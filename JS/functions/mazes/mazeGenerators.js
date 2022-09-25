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

randomizedDepthFirstSearchMazeGenerator = size => {

}