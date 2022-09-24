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
  if ( content[p.positions.y][p.positions.x] != E ) {
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
      return `${direction}M`;
    } else {
      if ( content[p.positions.y + y2][p.positions.x + x2] != 0 ) {
        trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], move);
        return `M`;
      } else { 
        if ( content[p.positions.y + y3][p.positions.x + x3] != 0 ) {
          trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], inverseRotateMove);
          return `${oppositeDirectionOf(direction)}M`;
        } else {
          trace[p.positions.y][p.positions.x] = changeTraceString(trace[p.positions.y][p.positions.x], doubleRotateMove);
          return `${direction}${direction}M`;
        }
      }
    }
  }
  
}

drawWallFollowerAlgTrace = (ctx, traceString, traceSidePs, traceSideWs, x, y, pS, wS, color) => {
  let xL, yL, dx, dy;
  dx = []; dy = []; xL = []; yL = [];
  
  ctx.fillStyle = color;

  if (traceString[0] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[0] = pS / 3 - traceSideWs + wS;
      // dy[0] = pS / 3 - traceSideWs + wS;
      // xL[0] = traceSideWs;
      // yL[0] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[0] = pS / 3 - traceSidePs + wS;
      dy[0] = wS;
      xL[0] = traceSidePs;
      yL[0] = pS / 3 - traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[0] = wS / 3 - traceSideWs;
      dy[0] = wS;
      xL[0] = traceSideWs;
      yL[0] = pS / 3 - traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[0] = pS / 3 - traceSidePs + wS;
      dy[0] = 0;
      xL[0] = traceSidePs;
      yL[0] = wS / 3 - traceSideWs;
    }
  }
  if (traceString[1] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[1] = pS / 3 - traceSideWs + wS;
      // dy[1] = pS / 3 - traceSideWs + wS;
      // xL[1] = traceSideWs;
      // yL[1] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[1] = pS * 2 / 3 + wS;
      dy[1] = wS;
      xL[1] = traceSidePs;
      yL[1] = pS / 3 - traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[1] = wS * 2/ 3;
      dy[1] = wS;
      xL[1] = traceSideWs;
      yL[1] = pS / 3 - traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[1] = pS * 2 / 3 + wS;
      dy[1] = 0;
      xL[1] = traceSidePs;
      yL[1] = wS / 3 - traceSideWs;
    }
  }
  if (traceString[2] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[2] = pS / 3 - traceSideWs + wS;
      // dy[2] = pS / 3 - traceSideWs + wS;
      // xL[2] = traceSideWs;
      // yL[2] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[2] = pS - (pS / 3 - traceSidePs) + wS;
      dy[2] = pS / 3 - traceSidePs + wS;
      xL[2] = pS / 3 - traceSidePs;
      yL[2] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[2] = wS * 2 / 3 + traceSideWs;
      dy[2] = pS / 3 - traceSidePs + wS;
      xL[2] = wS / 3 - traceSideWs;
      yL[2] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[2] = pS - (pS / 3 - traceSidePs) + wS;
      dy[2] = wS / 3 - traceSideWs;
      xL[2] = pS / 3 - traceSidePs;
      yL[2] = traceSideWs;
    }
  }
  if (traceString[3] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[3] = pS / 3 - traceSideWs + wS;
      // dy[3] = pS / 3 - traceSideWs + wS;
      // xL[3] = traceSideWs;
      // yL[3] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[3] = pS - (pS / 3 - traceSidePs) + wS;
      dy[3] = pS * 2 / 3 + wS;
      xL[3] = pS / 3 - traceSidePs;
      yL[3] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[3] = wS * 2 / 3 + traceSideWs;
      dy[3] = pS * 2 / 3 + wS;
      xL[3] = wS / 3 - traceSideWs;
      yL[3] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[3] = pS - (pS / 3 - traceSidePs) + wS;
      dy[3] = wS * 2 / 3;
      xL[3] = pS / 3 - traceSidePs;
      yL[3] = traceSideWs;
    }
  }
  if (traceString[4] == "1") {
    // dx[4] = (pS / 3 * 2);
    // dy[4] = (pS / 3 * 2 + traceSidePs);
    // xL[4] = traceSidePs;
    // yL[4] = pS / 3 - traceSidePs;

    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[4] = pS / 3 - traceSideWs + wS;
      // dy[4] = pS / 3 - traceSideWs + wS;
      // xL[4] = traceSideWs;
      // yL[4] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[4] = pS * 2 / 3 + wS;
      dy[4] = pS * 2 / 3 + traceSidePs + wS;
      xL[4] = traceSidePs;
      yL[4] = pS / 3 - traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[4] = wS * 2 / 3;
      dy[4] = pS * 2 / 3 + traceSidePs + wS;
      xL[4] = traceSideWs;
      yL[4] = pS / 3 - traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[4] = pS * 2 / 3 + wS;
      dy[4] = wS * 2 / 3 + traceSideWs;
      xL[4] = traceSidePs;
      yL[4] = wS / 3 - traceSideWs;
    }
  }
  if (traceString[5] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[5] = pS / 3 - traceSideWs + wS;
      // dy[5] = pS / 3 - traceSideWs + wS;
      // xL[5] = traceSideWs;
      // yL[5] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[5] = pS / 3 - traceSidePs + wS;
      dy[5] = pS * 2 / 3 + traceSidePs + wS;
      xL[5] = traceSidePs;
      yL[5] = pS / 3 - traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[5] = wS / 3 - traceSideWs;
      dy[5] = pS * 2 / 3 + traceSidePs + wS;
      xL[5] = traceSideWs;
      yL[5] = pS / 3 - traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[5] = pS / 3 - traceSidePs + wS;
      dy[5] = wS * 2 / 3 + traceSideWs;
      xL[5] = traceSidePs;
      yL[5] = wS / 3 - traceSideWs;
    }
  }
  if (traceString[6] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[6] = pS / 3 - traceSideWs + wS;
      // dy[6] = pS / 3 - traceSideWs + wS;
      // xL[6] = traceSideWs;
      // yL[6] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[6] = wS;
      dy[6] = pS * 2 / 3 + wS;
      xL[6] = pS / 3 - traceSidePs;
      yL[6] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[6] = 0;
      dy[6] = pS * 2 / 3 + wS;
      xL[6] = wS / 3 - traceSideWs;
      yL[6] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[6] = wS;
      dy[6] = wS * 2 / 3;
      xL[6] = pS / 3 - traceSidePs;
      yL[6] = traceSideWs;
    }
  }
  if (traceString[7] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[7] = pS / 3 - traceSideWs + wS;
      // dy[7] = pS / 3 - traceSideWs + wS;
      // xL[7] = traceSideWs;
      // yL[7] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[7] = wS;
      dy[7] = pS / 3 - traceSidePs + wS;
      xL[7] = pS / 3 - traceSidePs;
      yL[7] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[7] = 0;
      dy[7] = pS / 3 - traceSidePs + wS;
      xL[7] = wS / 3 - traceSideWs;
      yL[7] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[7] = wS;
      dy[7] = wS / 3 - traceSideWs;
      xL[7] = pS / 3 - traceSidePs;
      yL[7] = traceSideWs;
    }
  }
  if (traceString[8] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[8] = pS / 3 - traceSideWs + wS;
      // dy[8] = pS / 3 - traceSideWs + wS;
      // xL[8] = traceSideWs;
      // yL[8] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[8] = pS / 3 - traceSidePs + wS;
      dy[8] = pS / 3 - traceSidePs + wS;
      xL[8] = traceSidePs;
      yL[8] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[8] = wS / 3 - traceSideWs;
      dy[8] = pS / 3 - traceSidePs + wS;
      xL[8] = traceSideWs;
      yL[8] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[8] = pS / 3 - traceSidePs + wS;
      dy[8] = wS / 3 - traceSideWs;
      xL[8] = traceSidePs;
      yL[8] = traceSideWs;
    }
  }
  if (traceString[9] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[9] = pS / 3 - traceSideWs + wS;
      // dy[9] = pS / 3 - traceSideWs + wS;
      // xL[9] = traceSideWs;
      // yL[9] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[9] = pS / 3 + wS;
      dy[9] = pS / 3 - traceSidePs + wS;
      xL[9] = pS / 3;
      yL[9] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[9] = wS / 3;
      dy[9] = pS / 3 - traceSidePs + wS;
      xL[9] = wS / 3;
      yL[9] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[9] = pS / 3 + wS;
      dy[9] = wS / 3 - traceSideWs;
      xL[9] = pS / 3;
      yL[9] = traceSideWs;
    }
  }
  if (traceString[10] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[10] = pS / 3 - traceSideWs + wS;
      // dy[10] = pS / 3 - traceSideWs + wS;
      // xL[10] = traceSideWs;
      // yL[10] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[10] = pS * 2 / 3 + wS;
      dy[10] = pS / 3 - traceSidePs + wS;
      xL[10] = traceSidePs;
      yL[10] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[10] = wS * 2 / 3;
      dy[10] = pS / 3 - traceSidePs + wS;
      xL[10] = traceSideWs;
      yL[10] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[10] = pS * 2 / 3 + wS;
      dy[10] = wS / 3 - traceSideWs;
      xL[10] = traceSidePs;
      yL[10] = traceSideWs;
    }
  }
  if (traceString[11] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[11] = pS / 3 - traceSideWs + wS;
      // dy[11] = pS / 3 - traceSideWs + wS;
      // xL[11] = traceSideWs;
      // yL[11] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[11] = pS * 2 / 3 + wS;
      dy[11] = pS / 3 + wS;
      xL[11] = traceSidePs;
      yL[11] = pS / 3;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[11] = wS * 2 / 3;
      dy[11] = pS / 3 + wS;
      xL[11] = traceSideWs;
      yL[11] = pS / 3;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[11] = pS * 2 / 3 + wS;
      dy[11] = wS / 3;
      xL[11] = traceSidePs;
      yL[11] = wS / 3;
    }
  }
  if (traceString[12] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[12] = pS / 3 - traceSideWs + wS;
      // dy[12] = pS / 3 - traceSideWs + wS;
      // xL[12] = traceSideWs;
      // yL[12] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[12] = pS * 2 / 3 + wS;
      dy[12] = pS * 2 / 3 + wS;
      xL[12] = traceSidePs;
      yL[12] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[12] = wS * 2 / 3;
      dy[12] = pS * 2 / 3 + wS;
      xL[12] = traceSideWs;
      yL[12] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[12] = pS * 2 / 3 + wS;
      dy[12] = wS * 2 / 3;
      xL[12] = traceSidePs;
      yL[12] = traceSideWs;
    }
  }
  if (traceString[13] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[13] = pS / 3 - traceSideWs + wS;
      // dy[13] = pS / 3 - traceSideWs + wS;
      // xL[13] = traceSideWs;
      // yL[13] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[13] = pS / 3 + wS;
      dy[13] = pS * 2 / 3 + wS;
      xL[13] = pS / 3;
      yL[13] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[13] = wS / 3;
      dy[13] = pS * 2 / 3 + wS;
      xL[13] = wS / 3;
      yL[13] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[13] = pS / 3 + wS;
      dy[13] = wS * 2 / 3;
      xL[13] = pS / 3;
      yL[13] = traceSideWs;
    }
  }
  if (traceString[14] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[14] = pS / 3 - traceSideWs + wS;
      // dy[14] = pS / 3 - traceSideWs + wS;
      // xL[14] = traceSideWs;
      // yL[14] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[14] = pS / 3 - traceSidePs + wS;
      dy[14] = pS * 2 / 3 + wS;
      xL[14] = traceSidePs;
      yL[14] = traceSidePs;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[14] = wS / 3 - traceSideWs;
      dy[14] = pS * 2 / 3 + wS;
      xL[14] = traceSideWs;
      yL[14] = traceSidePs;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[14] = pS / 3 - traceSidePs + wS;
      dy[14] = wS * 2 / 3;
      xL[14] = traceSidePs;
      yL[14] = traceSideWs;
    }
  }
  if (traceString[15] == "1") {
    if ((y % 2 == 0) && (x % 2 == 0)) {
      // dx[15] = pS / 3 - traceSideWs + wS;
      // dy[15] = pS / 3 - traceSideWs + wS;
      // xL[15] = traceSideWs;
      // yL[15] = traceSideWs;
    } else if ((y % 2 != 0) && (x % 2 != 0)) {
      dx[15] = pS / 3 - traceSidePs + wS;
      dy[15] = pS / 3 + wS;
      xL[15] = traceSidePs;
      yL[15] = pS / 3;
    } else if (y % 2 != 0 && x % 2 == 0) {
      dx[15] = wS / 3 - traceSideWs;
      dy[15] = pS / 3 + wS;
      xL[15] = traceSideWs;
      yL[15] = pS / 3;
    } else if (y % 2 == 0 && x % 2 != 0) {
      dx[15] = pS / 3 - traceSidePs + wS;
      dy[15] = wS / 3;
      xL[15] = traceSidePs;
      yL[15] = wS / 3;
    }
  } 

  for (let i = 0; i < traceString.length; i++) {
    if (dx[i] != null && dy[i] != null) {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        ctx.fillRect(
          (x / 2) * (wS + pS) + dx[i], 
          (y / 2) * (wS + pS) + dy[i], 
          xL[i], 
          yL[i]
        )
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        ctx.fillRect(
          ((x - 1)/ 2) * (wS + pS) + dx[i], 
          ((y - 1)/ 2) * (wS + pS) + dy[i], 
          xL[i], 
          yL[i]
        )
      } else if (y % 2 != 0 && x % 2 == 0) {
        ctx.fillRect(
          (x / 2) * (wS + pS) + dx[i], 
          ((y - 1)/ 2) * (wS + pS) + dy[i], 
          xL[i], 
          yL[i]
        )
      } else if (y % 2 == 0 && x % 2 != 0) {
        ctx.fillRect(
          ((x - 1)/ 2) * (wS + pS) + dx[i], 
          (y / 2) * (wS + pS) + dy[i], 
          xL[i], 
          yL[i]
        )
      };
    }
  }
}

changeTraceString = (traceString, positions) => {
  for (let i = 0; i < positions.length; i++) {
    traceString = traceString.replaceAt(parseInt(positions[i]), "1");
  }
  return traceString;
}