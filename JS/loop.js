loop = () => {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, cv.width, cv.height);

  cv.width = cvSide;
  cv.height = cvSide;

  maze.draw(ctx);
  // maze.markMaze(ctx, {
  //   content: "", 
  //   color: "white", 
  //   size: maze.wS / 4, 
  //   fontFamily: "Monospace"
  // })

  // if (interval < solution.length)
  //   player.go(solution[interval]);
  // sleep(50);

  let s = wallFollowerAlgOneStep(player, maze, "L", trace);
  for (let i = 0; i < trace.length; i++) {
    for (let j = 0; j < trace[i].length; j++) {
      drawWallFollowerAlgTrace(ctx, trace[i][j], traceSide, j, i, maze.pS, maze.wS, "yellow")
    }  
  }
  player.goOneStep(s.solutionString);
  sleep(10);
  
  player.draw(ctx, maze.wS, maze.pS);

  interval++;
}

loop();
// playerJourney(solution);