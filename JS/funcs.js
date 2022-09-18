sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

isNumeric = str => {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

randomInt = (start, stop) => Math.round(Math.random() * (stop - start) + start);

let exponent = function(a, n) {
  if (n === 0) return 1;
  return a * exponent(a, n - 1);
};

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

unique = (a, fn) => {
  if (a.length === 0 || a.length === 1) {
    return a;
  }
  if (!fn) {
    return a;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (fn(a[i], a[j])) {
        a.splice(i, 1);
      }
    }
  }
  return a;
}

oppositeDirectionOf = direction => {
  if (direction == "U") return "D";
  if (direction == "D") return "U";
  if (direction == "R") return "L";
  if (direction == "L") return "R";
  return null;
}

// Need Fix
wallFollowerAlg = (player, maze, direction) => {
  let p = new Player(
    player.side,
    {
      x: player.positions.x,
      y: player.positions.y,
    },
    player.pointTo,
    player.speeds,
    player.color
  )

  let obj = {
    positions: {
      x: p.positions.x,
      y: p.positions.y
    },
    solutionString: ""
  };
  let mazeEndPos = maze.getPosition(E);
  while (JSON.stringify(obj.positions) !== JSON.stringify(mazeEndPos)) {
    obj.positions.x = wallFollowerAlgOneStep(player, maze, direction).positions.x; //Trouble
    obj.positions.y = wallFollowerAlgOneStep(player, maze, direction).positions.y;
    obj.solutionString += wallFollowerAlgOneStep(player, maze, direction).solutionString;
  }
  return obj.solutionString;
}

wallFollowerAlgOneStep = (player, maze, direction, trace) => {
  let p = new Player(
    player.side,
    {
      x: player.positions.x,
      y: player.positions.y,
    },
    player.pointTo,
    player.speeds,
    player.color
  )
  let {content} = maze;

  let y1, x1, y2, x2, y3, x3;
  let signChanger = direction == "L" ? 1 : direction == "R" ? -1 : 0;
  let move = [];

  y1 = x1 = y2 = x2 = y3 = x3 = 0;
  switch (p.pointTo) {
    case "U": y2 = -1; x1 = signChanger * -1; x3 = signChanger     ; break;
    case "D": y2 =  1; x1 = signChanger     ; x3 = signChanger * -1; break;
    case "R": y1 = signChanger * -1; x2 =  1; y3 = signChanger     ; break;
    case "L": y1 = signChanger     ; x2 = -1; y3 = signChanger * -1; break;
  }
  switch (p.pointTo) {
    case "U": 
      switch (direction) {
        case "L":
          move = ["5", "14", "15", "8", "0"];
          rotateMove = ["5", "14", "6"];
          inverseRotateMove = ["5", "14", "15", "8", "9", "10", "2"];
          doubleRotateMove = ["5", "14", "15", "8", "9", "10", "11", "12", "4"];
          break;
        case "R":
          move = ["4", "12", "11", "10", "1"];
          rotateMove = ["4", "12", "3"];
          inverseRotateMove = ["4", "12", "11", "10", "9", "8", "7"];
          doubleRotateMove = ["4", "12", "11", "10", "9", "8", "15", "14", "5"];
          break;
      }
      break;
    case "D": 
      switch (direction) {
        case "L":
          move = ["1", "10", "11", "12", "4"];
          rotateMove = ["1", "10", "2"];
          inverseRotateMove = ["1", "10", "11", "12", "13", "14", "6"];
          doubleRotateMove = ["1", "10", "11", "12", "13", "14", "15", "8", "0"];
          break;
        case "R":
          move = ["0", "8", "15", "14", "5"];
          rotateMove = ["0", "7", "8"];
          inverseRotateMove = ["0", "8", "15", "14", "13", "12", "3"];
          doubleRotateMove = ["0", "8", "15", "14", "13", "12", "11", "10", "1"];
          break;
      }
      break;
    case "R": 
      switch (direction) {
        case "L":
          move = ["7", "8", "9", "10", "2"];
          rotateMove = ["7", "8", "0"];
          inverseRotateMove = ["7", "8", "9", "10", "11", "12", "4"];
          doubleRotateMove = ["7", "8", "9", "10", "11", "12", "13", "14", "6"];
          break;
        case "R":
          move = ["6", "14", "13", "12", "3"];
          rotateMove = ["6", "14", "5"];
          inverseRotateMove = ["6", "14", "13", "12", "11", "10", "1"];
          doubleRotateMove = ["6", "14", "13", "12", "11", "10", "9", "8", "7"];
          break;
      }
      break;
    case "L": 
      switch (direction) {
        case "L":
          move = ["3", "12", "13", "14", "6"];
          rotateMove = ["3", "12", "4"];
          inverseRotateMove = ["3", "12", "13", "14", "15", "8", "0"];
          doubleRotateMove = ["3", "12", "13", "14", "15", "8", "9", "10", "2"];
          break;
        case "R":
          move = ["2", "10", "9", "8", "7"];
          rotateMove = ["2", "10", "1"];
          inverseRotateMove = ["2", "10", "9", "8", "15", "14", "5"];
          doubleRotateMove = ["2", "10", "9", "8", "15", "14", "13", "12", "3"];
          break;
      }
      break;
  }
  if ( content[p.positions.y + y1][p.positions.x + x1] != 0 ) {
    trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], rotateMove);
    p.rotate(direction);
    p.move();
    return {
      positions: {
        x: p.positions.x,
        y: p.positions.y,
      }, 
      solutionString: `${direction}M`
    };
  } else {
    if ( content[p.positions.y + y2][p.positions.x + x2] != 0 ) {
      trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], move);
      p.move();
      return {
        positions: {
          x: p.positions.x,
          y: p.positions.y,
        }, 
        solutionString: `M`
      };
    } else { 
      if ( content[p.positions.y + y3][p.positions.x + x3] != 0 ) {
        trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], inverseRotateMove);
        p.rotate(oppositeDirectionOf(direction));
        p.move();
        return {
          positions: {
            x: p.positions.x,
            y: p.positions.y,
          }, 
          solutionString: `${oppositeDirectionOf(direction)}M`
        };
      } else {
        trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], doubleRotateMove);
        p.rotate(direction);
        p.rotate(direction);
        p.move();
        return {
          positions: {
            x: p.positions.x,
            y: p.positions.y,
          }, 
          solutionString: `${direction}${direction}M`
        };
      }
    }
  }
}

drawWallFollowerAlgTrace = (ctx, traceString, traceSide, x, y, pS, wS, color) => {
  let xL, yL, dx, dy;
  dx = []; dy = []; xL = []; yL = [];
  
  if (traceString[0] == "1") {
    dx[0] = (pS / 3 - traceSide);
    dy[0] = 0;
    xL[0] = traceSide;
    yL[0] = pS / 3 - traceSide;
  }
  if (traceString[1] == "1") {
    dx[1] = (pS / 3 * 2);
    dy[1] = 0;
    xL[1] = traceSide;
    yL[1] = pS / 3 - traceSide;
  }
  if (traceString[2] == "1") {
    dx[2] = (pS / 3 * 2 + traceSide);
    dy[2] = (pS / 3 - traceSide);
    xL[2] = pS / 3 - traceSide;
    yL[2] = traceSide;
  }
  if (traceString[3] == "1") {
    dx[3] = (pS / 3 * 2 + traceSide);
    dy[3] = (pS / 3 * 2);
    xL[3] = pS / 3 - traceSide;
    yL[3] = traceSide;
  }
  if (traceString[4] == "1") {
    dx[4] = (pS / 3 * 2);
    dy[4] = (pS / 3 * 2 + traceSide);
    xL[4] = traceSide;
    yL[4] = pS / 3 - traceSide;
  }
  if (traceString[5] == "1") {
    dx[5] = (pS / 3 - traceSide);
    dy[5] = (pS / 3 * 2 + traceSide);
    xL[5] = traceSide;
    yL[5] = pS / 3 - traceSide;
  }
  if (traceString[6] == "1") {
    dx[6] = 0;
    dy[6] = (pS / 3 * 2);
    xL[6] = pS / 3 - traceSide;
    yL[6] = traceSide;
  }
  if (traceString[7] == "1") {
    dx[7] = 0;
    dy[7] = (pS / 3 - traceSide);
    xL[7] = pS / 3 - traceSide;
    yL[7] = traceSide;
  }
  if (traceString[8] == "1") {
    dx[8] = (pS / 3 - traceSide);
    dy[8] = (pS / 3 - traceSide);
    xL[8] = traceSide;
    yL[8] = traceSide;
  }
  if (traceString[9] == "1") {
    dx[9] = (pS / 3);
    dy[9] = (pS / 3 - traceSide);
    xL[9] = pS / 3;
    yL[9] = traceSide;
  }
  if (traceString[10] == "1") {
    dx[10] = (pS / 3 * 2);
    dy[10] = (pS / 3 - traceSide);
    xL[10] = traceSide;
    yL[10] = traceSide;
  }
  if (traceString[11] == "1") {
    dx[11] = (pS / 3 * 2);
    dy[11] = (pS / 3);
    xL[11] = traceSide;
    yL[11] = pS / 3;
  }
  if (traceString[12] == "1") {
    dx[12] = (pS / 3 * 2);
    dy[12] = (pS / 3 * 2);
    xL[12] = traceSide;
    yL[12] = traceSide;
  }
  if (traceString[13] == "1") {
    dx[13] = (pS / 3);
    dy[13] = (pS / 3 * 2);
    xL[13] = pS / 3;
    yL[13] = traceSide;
  }
  if (traceString[14] == "1") {
    dx[14] = (pS / 3 - traceSide);
    dy[14] = (pS / 3 * 2);
    xL[14] = traceSide;
    yL[14] = traceSide;
  }
  if (traceString[15] == "1") {
    dx[15] = (pS / 3 - traceSide);
    dy[15] = (pS / 3);
    xL[15] = traceSide;
    yL[15] = pS / 3;
  } 
  
  ctx.fillStyle = color;

  for (let i = 0; i < traceString.length; i++) {
    if (dx[i] != null && dy[i] != null) {
      ctx.fillRect(
        (x / 2) * (wS + pS) + dx[i], 
        (y / 2) * (wS + pS) + dy[i], 
        xL[i], 
        yL[i]
      )
    }
  }
}

changeTraceString = (traceString, positions) => {
  for (let i = 0; i < positions.length; i++) {
    traceString = traceString.replaceAt(parseInt(positions[i]), "1");
  }
  return traceString;
}

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
  // let initCell = {x: randomInt(1, size.x - 1), y: randomInt(1, size.y - 1)}
  let initCell = {x: 1, y: 5}

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

getRandomEntrancePosition = (maze, direction, exclude) => {
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
      x = maze.length - 1;
      while (maze[y][x - 1] == exclude)
        y = randomInt(1, maze.length - 2);
      break;
  }

  return {x, y, pointTo: oppositeDirectionOf(direction)};
}