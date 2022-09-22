primAlgMazeGenerator = size => {
  // Init

  let maze = [];
  let walls = [];
  let neighborsOfRandomWall = null;

  // Start with a grid full of walls.
  for (let i = 0; i < size.y; i++) {
    maze[i] = [];
    for (let j = 0; j < size.x; j++) {
      // if (i == 0 || i == size.y - 1 || j == 0 || j == size.x - 1)
      //   maze[i][j] = -1;
      // else 
        maze[i][j] = B;
    }
  }

  // Pick a random cell
  // let initCell = {x: randomInt(1, size.x - 2), y: randomInt(1, size.y - 2)}
  let initCell = {x: 1, y: 1}

  // Set it to be a passage
  maze[initCell.y][initCell.x] = P;

  // Compute its frontier cells
  let wallsOfInitCell = getFrontierCells(maze, initCell, 2);

  // Add the walls of the cell to the wall list.
  walls.push(...wallsOfInitCell);

  // While there are walls in the list
  while (walls.length != 0) {

    walls = unique( walls, (a, b) => (a.x === b.x) & (a.y === b.y) );

    // Pick a random frontier cell from walls.
    let randomWallIndex = randomInt(0, walls.length - 1);
    let randomWall = walls[randomWallIndex];

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
      }
    }
    // Compute the frontier cells of the chosen frontier cell and add them to the frontier collection
    let wallsOfRandomWall = getFrontierCells(maze, randomWall, 2);
    walls.push(...wallsOfRandomWall);
  }

  return maze;
}