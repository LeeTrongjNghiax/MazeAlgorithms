class Input{
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

class InputRange extends Input{
  constructor(id, value, min, max, step) {
    super(id, value);
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

class Player{
  constructor(side, positions, pointTo, speeds, color) {
    this.side = side;
    this.positions = positions;
    this.pointTo = pointTo; //U, D, L, R
    this.speeds = speeds;
    this.color = color;

    this.originalPositions = {x: 0, y: 0};
    this.originalPositions.x = positions.x;
    this.originalPositions.y = positions.y;
    this.originalPointTo = pointTo;

    this.moveCount = 0;
    this.rotateCount = 0;
  }
  draw(ctx, wS, pS) {
    let x1, x2, x3, y1, y2, y3;
 
    switch (this.pointTo) {
      case "U": 
        x1 = -1; x2 = 1; x3 =  0;
        y1 =  1; y2 = 1; y3 = -1;
        break;
      case "D": 
        x1 = -1; x2 =  1; x3 = 0;
        y1 = -1; y2 = -1; y3 = 1;
        break;
      case "L": 
        x1 =  1; x2 = 1; x3 = -1;
        y1 = -1; y2 = 1; y3 =  0;
        break;
      case "R": 
        x1 = -1; x2 = -1; x3 = 1;
        y1 = -1; y2 =  1; y3 = 0;
        break;
    }
    ctx.beginPath();
    ctx.moveTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x1), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y1), 
    );
    ctx.lineTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x2), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y2), 
    );
    ctx.lineTo(
      this.positions.x / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * x3), 
      this.positions.y / 2 * (wS + pS) + wS / 2 + ((this.side / 2) * y3), 
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  rotate(option) {
    switch (option) {
      case "L":
        switch (this.pointTo) {
          case "U": this.pointTo = "L"; break;
          case "L": this.pointTo = "D"; break;
          case "D": this.pointTo = "R"; break;
          case "R": this.pointTo = "U"; break;
        }
        break;
      case "R":
        switch (this.pointTo) {
          case "U": this.pointTo = "R"; break;
          case "R": this.pointTo = "D"; break;
          case "D": this.pointTo = "L"; break;
          case "L": this.pointTo = "U"; break;
        }
        break;
    }
    this.rotateCount++;
  }
  move() {
    switch (this.pointTo) {
      case "U": 
        this.positions.y -= 1; 
        break;
      case "D": 
        this.positions.y += 1; 
        break;
      case "R": 
        this.positions.x += 1; 
        break;
      case "L": 
        this.positions.x -= 1; 
        break;
    }
    this.moveCount++;
  }
  goOneStep(move) {
    switch (move) {
      case "R": this.rotate("R"); break;
      case "L": this.rotate("L"); break;
      case "M": this.move(); break;
      case "RM": this.rotate("R"); this.move(); break;
      case "LM": this.rotate("L"); this.move(); break;
      case "RRM": this.rotate("R"); this.rotate("R"); this.move(); break;
      case "LLM": this.rotate("L"); this.rotate("L"); this.move(); break;
      default: break;
    }
  }
  go(solution) {
    for (let i = 0; i < solution.length; i++) {
      switch (solution[i]) {
        case "R": this.rotate("R"); break;
        case "L": this.rotate("L"); break;
        case "M": this.move(); break;
      }
    }
  }
  reset() {
    this.positions.x = this.originalPositions.x;
    this.positions.y = this.originalPositions.y;
    this.pointTo = this.originalPointTo;
  }
}

class Maze{
  constructor(content, pS, wS, colors, cells = null, currentCell = null) {
    this.content = content;
    this.pS = pS;
    this.wS = wS;
    this.colors = colors;
    this.cells = cells;
    this.currentCell = currentCell;
  }
  getRandomEntrancePosition(direction, excludeNearBy = [B], exclude = [4]) {
    let x, y;
  
    switch (direction) {
      case "U":
        y = 0;
        x = randomOdd(1, this.content[0].length - 2);
        while (excludeNearBy.includes(this.content[y + 1][x]) || 
              exclude.includes(this.content[y][x]))
          x = randomOdd(1, this.content[0].length - 2);
        break;
      case "D":
        y = this.content.length - 1;
        x = randomOdd(1, this.content[0].length - 2);
        while (excludeNearBy.includes(this.content[y - 1][x]) || 
              exclude.includes(this.content[y][x]))
          x = randomOdd(1, this.content[0].length - 2);
        break;
      case "L":
        y = randomOdd(1, this.content.length - 2);
        x = 0;
        while (excludeNearBy.includes(this.content[y][x + 1]) || 
              exclude.includes(this.content[y][x]))
          y = randomOdd(1, this.content.length - 2);
        break;
      case "R":
        y = randomOdd(1, this.content.length - 2);
        x = this.content[0].length - 1;
        while (excludeNearBy.includes(this.content[y][x - 1]) || 
              exclude.includes(this.content[y][x]))
          y = randomOdd(1, this.content.length - 2);
        break;
    }
  
    return {x, y, pointTo: oppositeDirectionOf(direction)};
  }
  getPosition(option) {
    for (let i = 0; i < this.content.length; i++) {
      for (let j = 0; j < this.content[i].length; j++) {
        if (this.content[i][j] == option) return {x: j, y: i};
      }
    }
  }
  setEntrance(position, option) {
    this.content[position.y][position.x] = option;
  }
  markOnSquare(ctx, position, txt) {
    let x;
    txt.content = txt.content.toString();
  
    switch (txt.content.length) {
      case 1: x = 2; break;
      case 2: x = 1; break;
      case 3: x = 0.6; break;
    }
  
    ctx.font = `${txt.size * 2}px ${txt.fontFamily}`;
    ctx.fillStyle = `${txt.color}`;
    ctx.fillText(txt.content, (position.x - txt.size / x), (position.y + txt.size / 2));
  }
  markAllMaze(ctx, txt) {
    const {content, pS, wS} = this;
  
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        txt.content = (i * content[i].length) + j
        this.markOnSquare(
          ctx,
          {
            x: (j / 2) * (wS + pS) + (wS / 2),
            y: (i / 2) * (wS + pS) + (wS / 2)
          },
          txt
        );
      }
    }
  }
  draw(ctx) {
    const {content, pS, wS, colors} = this;
  
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        switch (content[i][j]) {
          case B: case -1:
            ctx.fillStyle = colors.B;
            break;
          case S:
            ctx.fillStyle = colors.S;
            break;
          case E:
            ctx.fillStyle = colors.E;
            break;
          default:
            ctx.fillStyle = colors.P;
        }
        if ((i % 2 == 0) && (j % 2 == 0))
          ctx.fillRect((j / 2) * (wS + pS), (i / 2) * (wS + pS), wS, wS);

        else if ((i % 2 != 0) && (j % 2 != 0)) 
          ctx.fillRect(((j - 1)/ 2) * (wS + pS) + wS, ((i - 1) / 2) * (wS + pS) + wS, pS, pS);

        else if (i % 2 != 0 && j % 2 == 0) 
          ctx.fillRect((j / 2) * (wS + pS), ((i - 1) / 2) * (wS + pS) + wS, wS, pS);
          
        else if (i % 2 == 0 && j % 2 != 0) 
          ctx.fillRect(((j - 1) / 2) * (wS + pS) + wS, (i / 2) * (wS + pS), pS, wS);
      }
    }

    if (this.cells != null) {
      ctx.fillStyle = this.colors.T;
      for (let i = 0; i < this.cells.length; i++) {
        if ((this.cells[i].y % 2 == 0) && (this.cells[i].x % 2 == 0))
          ctx.fillRect((this.cells[i].x / 2) * (wS + pS), (this.cells[i].y / 2) * (wS + pS), wS, wS);

        else if ((this.cells[i].y % 2 != 0) && (this.cells[i].x % 2 != 0)) 
          ctx.fillRect(((this.cells[i].x - 1)/ 2) * (wS + pS) + wS, ((this.cells[i].y - 1) / 2) * (wS + pS) + wS, pS, pS);

        else if (this.cells[i].y % 2 != 0 && this.cells[i].x % 2 == 0) 
          ctx.fillRect((this.cells[i].x / 2) * (wS + pS), ((this.cells[i].y - 1) / 2) * (wS + pS) + wS, wS, pS);
          
        else if (this.cells[i].y % 2 == 0 && this.cells[i].x % 2 != 0) 
          ctx.fillRect(((this.cells[i].x - 1) / 2) * (wS + pS) + wS, (this.cells[i].y / 2) * (wS + pS), pS, wS);
      }
    }

    if (this.currentCell != null) {
      ctx.fillStyle = this.colors.T;
      if ((this.currentCell.y % 2 == 0) && (this.currentCell.x % 2 == 0))
        ctx.fillRect((this.currentCell.x / 2) * (wS + pS), (this.currentCell.y / 2) * (wS + pS), wS, wS);
    
      else if ((this.currentCell.y % 2 != 0) && (this.currentCell.x % 2 != 0)) 
        ctx.fillRect(((this.currentCell.x - 1)/ 2) * (wS + pS) + wS, ((this.currentCell.y - 1) / 2) * (wS + pS) + wS, pS, pS);
    
      else if (this.currentCell.y % 2 != 0 && this.currentCell.x % 2 == 0) 
        ctx.fillRect((this.currentCell.x / 2) * (wS + pS), ((this.currentCell.y - 1) / 2) * (wS + pS) + wS, wS, pS);
        
      else if (this.currentCell.y % 2 == 0 && this.currentCell.x % 2 != 0) 
        ctx.fillRect(((this.currentCell.x - 1) / 2) * (wS + pS) + wS, (this.currentCell.y / 2) * (wS + pS), pS, wS);      
    }
  }
}

class WallFollowerAlgTrace{
  constructor(maze, player) {
    this.maze = maze;
    this.player = player;
    let traceSide = {
      pS: (this.maze.pS / 3) / 3 * 2,
      wS: (this.maze.wS / 3) / 3 * 2
    };
    this.trace = Array(this.maze.content.length).fill().map(
      () => Array(this.maze.content[0].length).fill().map(
        () => Array(5).fill().map(
          () => Array(5).fill(0)
        )
      )
    )
  }
  markTrace(position, ...tracePositions) {
    for (let i = 0; i < tracePositions.length; i++) {
      this.trace[position.y][position.x][tracePositions[i].y][tracePositions[i].x] = 1;
    }
  }
  drawWallFollowerAlgTrace(ctx) {
    let xL, yL, dx, dy;
    let interval = 0;
    dx = []; dy = []; xL = []; yL = [];
    
    ctx.fillStyle = this.player.color;
  
    for (let y = 0; y < this.trace.length; y++) {
      for (let x = 0; x < this.trace[y].length; x++) {
        for (let k = 0; k < this.trace[y][x].length; k++) {
          for (let l = 0; l < this.trace[y][x][k].length; l++) {
            if (this.trace[y][x][k][l] == 1) {
              if (k == 0) {
                // 0
                if (l == 1) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 1
                if (l == 3) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
              }
              if (k == 1) {
                // 7
                if (l == 0) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 8
                if (l == 1) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 9
                if (l == 2) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 10
                if (l == 3) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 2
                if (l == 4) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
              }
              if (k == 2) {
                // 15
                if (l == 1) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 11
                if (l == 3) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
              }
              if (k == 3) {
                // 6
                if (l == 0) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 14
                if (l == 1) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 13
                if (l == 2) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 12
                if (l == 3) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 3
                if (l == 4) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
              }
              if (k == 4) {
                // 5
                if (l == 1) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
                // 4
                if (l == 3) {
                  if (y % 2 == 0) {
                    if (x % 2 == 0) {

                    } else {

                    }
                  } else {
                    if (x % 2 == 0) {

                    } else {
                      
                    }
                  }
                }
              }
              
              let baseX, baseY;
              for (let i = 0; i < traceString.length; i++) {
                if (y % 2 == 0) {
                  baseY = (y / 2) * (this.maze.wS + this.maze.pS);
                  if (x % 2 == 0) {
                    baseX = (x / 2) * (this.maze.wS + this.maze.pS);
                  } else {
                    baseX = ((x - 1)/ 2) * (this.maze.wS + this.maze.pS);
                  }
                } else {
                  baseY = ((y - 1)/ 2) * (this.maze.wS + this.maze.pS);
                  if (x % 2 == 0) {
                    baseX = (x / 2) * (this.maze.wS + this.maze.pS);
                  } else {
                    baseX = ((x - 1)/ 2) * (this.maze.wS + this.maze.pS);
                  }
                }
                ctx.fillRect(
                  baseX + dx[i], 
                  baseY + dy[i], 
                  xL[i], 
                  yL[i]
                );
              }
            }
          }
        }
      }
    }
    if (traceString[0] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[0] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[0] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[0] = this.traceSide.wS;
        // yL[0] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[0] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[0] = this.maze.wS;
        xL[0] = this.traceSide.pS;
        yL[0] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[0] = this.maze.wS / 3 - this.traceSide.wS;
        dy[0] = this.maze.wS;
        xL[0] = this.traceSide.wS;
        yL[0] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[0] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[0] = 0;
        xL[0] = this.traceSide.pS;
        yL[0] = this.maze.wS / 3 - this.traceSide.wS;
      }
    }
    if (traceString[1] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[1] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[1] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[1] = this.traceSide.wS;
        // yL[1] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[1] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[1] = this.maze.wS;
        xL[1] = this.traceSide.pS;
        yL[1] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[1] = this.maze.wS * 2/ 3;
        dy[1] = this.maze.wS;
        xL[1] = this.traceSide.wS;
        yL[1] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[1] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[1] = 0;
        xL[1] = this.traceSide.pS;
        yL[1] = this.maze.wS / 3 - this.traceSide.wS;
      }
    }
    if (traceString[2] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[2] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[2] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[2] = this.traceSide.wS;
        // yL[2] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[2] = this.maze.pS - (this.maze.pS / 3 - this.traceSide.pS) + this.maze.wS;
        dy[2] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[2] = this.maze.pS / 3 - this.traceSide.pS;
        yL[2] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[2] = this.maze.wS * 2 / 3 + this.traceSide.wS;
        dy[2] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[2] = this.maze.wS / 3 - this.traceSide.wS;
        yL[2] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[2] = this.maze.pS - (this.maze.pS / 3 - this.traceSide.pS) + this.maze.wS;
        dy[2] = this.maze.wS / 3 - this.traceSide.wS;
        xL[2] = this.maze.pS / 3 - this.traceSide.pS;
        yL[2] = this.traceSide.wS;
      }
    }
    if (traceString[3] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[3] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[3] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[3] = this.traceSide.wS;
        // yL[3] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[3] = this.maze.pS - (this.maze.pS / 3 - this.traceSide.pS) + this.maze.wS;
        dy[3] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[3] = this.maze.pS / 3 - this.traceSide.pS;
        yL[3] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[3] = this.maze.wS * 2 / 3 + this.traceSide.wS;
        dy[3] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[3] = this.maze.wS / 3 - this.traceSide.wS;
        yL[3] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[3] = this.maze.pS - (this.maze.pS / 3 - this.traceSide.pS) + this.maze.wS;
        dy[3] = this.maze.wS * 2 / 3;
        xL[3] = this.maze.pS / 3 - this.traceSide.pS;
        yL[3] = this.traceSide.wS;
      }
    }
    if (traceString[4] == "1") {
      // dx[4] = (this.maze.pS / 3 * 2);
      // dy[4] = (this.maze.pS / 3 * 2 + this.traceSide.pS);
      // xL[4] = this.traceSide.pS;
      // yL[4] = this.maze.pS / 3 - this.traceSide.pS;
  
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[4] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[4] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[4] = this.traceSide.wS;
        // yL[4] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[4] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[4] = this.maze.pS * 2 / 3 + this.traceSide.pS + this.maze.wS;
        xL[4] = this.traceSide.pS;
        yL[4] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[4] = this.maze.wS * 2 / 3;
        dy[4] = this.maze.pS * 2 / 3 + this.traceSide.pS + this.maze.wS;
        xL[4] = this.traceSide.wS;
        yL[4] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[4] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[4] = this.maze.wS * 2 / 3 + this.traceSide.wS;
        xL[4] = this.traceSide.pS;
        yL[4] = this.maze.wS / 3 - this.traceSide.wS;
      }
    }
    if (traceString[5] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[5] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[5] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[5] = this.traceSide.wS;
        // yL[5] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[5] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[5] = this.maze.pS * 2 / 3 + this.traceSide.pS + this.maze.wS;
        xL[5] = this.traceSide.pS;
        yL[5] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[5] = this.maze.wS / 3 - this.traceSide.wS;
        dy[5] = this.maze.pS * 2 / 3 + this.traceSide.pS + this.maze.wS;
        xL[5] = this.traceSide.wS;
        yL[5] = this.maze.pS / 3 - this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[5] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[5] = this.maze.wS * 2 / 3 + this.traceSide.wS;
        xL[5] = this.traceSide.pS;
        yL[5] = this.maze.wS / 3 - this.traceSide.wS;
      }
    }
    if (traceString[6] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[6] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[6] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[6] = this.traceSide.wS;
        // yL[6] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[6] = this.maze.wS;
        dy[6] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[6] = this.maze.pS / 3 - this.traceSide.pS;
        yL[6] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[6] = 0;
        dy[6] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[6] = this.maze.wS / 3 - this.traceSide.wS;
        yL[6] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[6] = this.maze.wS;
        dy[6] = this.maze.wS * 2 / 3;
        xL[6] = this.maze.pS / 3 - this.traceSide.pS;
        yL[6] = this.traceSide.wS;
      }
    }
    if (traceString[7] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[7] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[7] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[7] = this.traceSide.wS;
        // yL[7] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[7] = this.maze.wS;
        dy[7] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[7] = this.maze.pS / 3 - this.traceSide.pS;
        yL[7] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[7] = 0;
        dy[7] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[7] = this.maze.wS / 3 - this.traceSide.wS;
        yL[7] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[7] = this.maze.wS;
        dy[7] = this.maze.wS / 3 - this.traceSide.wS;
        xL[7] = this.maze.pS / 3 - this.traceSide.pS;
        yL[7] = this.traceSide.wS;
      }
    }
    if (traceString[8] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[8] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[8] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[8] = this.traceSide.wS;
        // yL[8] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[8] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[8] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[8] = this.traceSide.pS;
        yL[8] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[8] = this.maze.wS / 3 - this.traceSide.wS;
        dy[8] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[8] = this.traceSide.wS;
        yL[8] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[8] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[8] = this.maze.wS / 3 - this.traceSide.wS;
        xL[8] = this.traceSide.pS;
        yL[8] = this.traceSide.wS;
      }
    }
    if (traceString[9] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[9] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[9] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[9] = this.traceSide.wS;
        // yL[9] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[9] = this.maze.pS / 3 + this.maze.wS;
        dy[9] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[9] = this.maze.pS / 3;
        yL[9] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[9] = this.maze.wS / 3;
        dy[9] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[9] = this.maze.wS / 3;
        yL[9] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[9] = this.maze.pS / 3 + this.maze.wS;
        dy[9] = this.maze.wS / 3 - this.traceSide.wS;
        xL[9] = this.maze.pS / 3;
        yL[9] = this.traceSide.wS;
      }
    }
    if (traceString[10] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[10] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[10] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[10] = this.traceSide.wS;
        // yL[10] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[10] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[10] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[10] = this.traceSide.pS;
        yL[10] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[10] = this.maze.wS * 2 / 3;
        dy[10] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        xL[10] = this.traceSide.wS;
        yL[10] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[10] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[10] = this.maze.wS / 3 - this.traceSide.wS;
        xL[10] = this.traceSide.pS;
        yL[10] = this.traceSide.wS;
      }
    }
    if (traceString[11] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[11] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[11] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[11] = this.traceSide.wS;
        // yL[11] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[11] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[11] = this.maze.pS / 3 + this.maze.wS;
        xL[11] = this.traceSide.pS;
        yL[11] = this.maze.pS / 3;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[11] = this.maze.wS * 2 / 3;
        dy[11] = this.maze.pS / 3 + this.maze.wS;
        xL[11] = this.traceSide.wS;
        yL[11] = this.maze.pS / 3;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[11] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[11] = this.maze.wS / 3;
        xL[11] = this.traceSide.pS;
        yL[11] = this.maze.wS / 3;
      }
    }
    if (traceString[12] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[12] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[12] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[12] = this.traceSide.wS;
        // yL[12] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[12] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[12] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[12] = this.traceSide.pS;
        yL[12] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[12] = this.maze.wS * 2 / 3;
        dy[12] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[12] = this.traceSide.wS;
        yL[12] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[12] = this.maze.pS * 2 / 3 + this.maze.wS;
        dy[12] = this.maze.wS * 2 / 3;
        xL[12] = this.traceSide.pS;
        yL[12] = this.traceSide.wS;
      }
    }
    if (traceString[13] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[13] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[13] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[13] = this.traceSide.wS;
        // yL[13] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[13] = this.maze.pS / 3 + this.maze.wS;
        dy[13] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[13] = this.maze.pS / 3;
        yL[13] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[13] = this.maze.wS / 3;
        dy[13] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[13] = this.maze.wS / 3;
        yL[13] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[13] = this.maze.pS / 3 + this.maze.wS;
        dy[13] = this.maze.wS * 2 / 3;
        xL[13] = this.maze.pS / 3;
        yL[13] = this.traceSide.wS;
      }
    }
    if (traceString[14] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[14] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[14] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[14] = this.traceSide.wS;
        // yL[14] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[14] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[14] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[14] = this.traceSide.pS;
        yL[14] = this.traceSide.pS;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[14] = this.maze.wS / 3 - this.traceSide.wS;
        dy[14] = this.maze.pS * 2 / 3 + this.maze.wS;
        xL[14] = this.traceSide.wS;
        yL[14] = this.traceSide.pS;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[14] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[14] = this.maze.wS * 2 / 3;
        xL[14] = this.traceSide.pS;
        yL[14] = this.traceSide.wS;
      }
    }
    if (traceString[15] == "1") {
      if ((y % 2 == 0) && (x % 2 == 0)) {
        // dx[15] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // dy[15] = this.maze.pS / 3 - this.traceSide.wS + this.maze.wS;
        // xL[15] = this.traceSide.wS;
        // yL[15] = this.traceSide.wS;
      } else if ((y % 2 != 0) && (x % 2 != 0)) {
        dx[15] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[15] = this.maze.pS / 3 + this.maze.wS;
        xL[15] = this.traceSide.pS;
        yL[15] = this.maze.pS / 3;
      } else if (y % 2 != 0 && x % 2 == 0) {
        dx[15] = this.maze.wS / 3 - this.traceSide.wS;
        dy[15] = this.maze.pS / 3 + this.maze.wS;
        xL[15] = this.traceSide.wS;
        yL[15] = this.maze.pS / 3;
      } else if (y % 2 == 0 && x % 2 != 0) {
        dx[15] = this.maze.pS / 3 - this.traceSide.pS + this.maze.wS;
        dy[15] = this.maze.wS / 3;
        xL[15] = this.traceSide.pS;
        yL[15] = this.maze.wS / 3;
      }
    } 
  }
}