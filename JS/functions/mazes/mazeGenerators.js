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

  let neighborsOfRandomWall = null;

  // // Pick a random cell
  // let initCell = {
  //   x: randomOdd(1, maze[0].length - 2), 
  //   y: randomOdd(1, maze.length - 2)
  // }

  // // Set it to be a passage
  // maze[initCell.y][initCell.x] = P;

  // // Compute its frontier cells
  // let wallsOfInitCell = getFrontierCells(maze, initCell, 2);

  // // Add the walls of the cell to the wall list.
  // walls.push(...wallsOfInitCell);

  // Remove duplicate walls
  walls = unique( walls, (a, b) => (a.x === b.x) & (a.y === b.y) );

  // Pick a random frontier cell from walls.
  let randomWallIndex = randomInt(0, walls.length - 1);
  let randomWall = walls[randomWallIndex];

  if (typeof randomWall !== 'undefined') {
    // Remove it from the walls list
    walls.splice(randomWallIndex, 1);

    // Get neighbours of randomWall
    neighborsOfRandomWall = null;
    neighborsOfRandomWall = getNeighbourCells(maze, {x: randomWall.x, y: randomWall.y}, 2);

    // Connect randomWall with random neighbour from neighborsOfRandomWall
    if (neighborsOfRandomWall.length != 0) {

      // Pick a random neighbor
      let randomNeighborIndex = randomInt(0, neighborsOfRandomWall.length - 1);

      // Connect the frontier cell with the neighbor
      let connectedCell = getConnectedCell(randomWall, neighborsOfRandomWall[randomNeighborIndex], 2);
      if (connectedCell != null) {
        maze[connectedCell.y][connectedCell.x] = P;
        maze[randomWall.y][randomWall.x] = P;

        ctx.clearRect(0, 0, cv.width, cv.height);

        cv.width = cvSide;
        cv.height = cvSide;
      }
    }
    // Compute the frontier cells of the chosen frontier cell and add them to the frontier collection
    let wallsOfRandomWall = getFrontierCells(maze, randomWall, 2);
    walls.push(...wallsOfRandomWall);
  }
  return {maze, walls};
}

randomizedDepthFirstSearchMazeGenerator = size => {

}