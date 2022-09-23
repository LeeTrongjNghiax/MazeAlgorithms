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
  constructor(content, pS, wS, colors) {
    this.content = content;
    this.pS = pS;
    this.wS = wS;
    this.colors = colors;
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
  }
}