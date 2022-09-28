loop = () => {
  requestAnimationFrame(loop);
  
  ctx.clearRect(0, 0, cv.width, cv.height);
  
  cv.width = cvSide;
  cv.height = cvSide;

  // maze_primAlgMazeGeneratorModified = primAlgMazeGeneratorModified(
  //   maze_primAlgMazeGeneratorModified.maze, 
  //   maze_primAlgMazeGeneratorModified.cells
  // );

  // maze = new Maze(
  //   maze_primAlgMazeGeneratorModified.maze,
  //   pS, 
  //   wS,
  //   {
  //     B: wallColor,
  //     S: startColor,
  //     E: endColor,
  //     P: pathColor,
  //     T: "green"
  //   },
  //   maze_primAlgMazeGeneratorModified.cells
  // )
  // maze.draw(ctx);

  // maze3_aldousBroderMazeGenerator = aldousBroderMazeGenerator(
  //   maze3_aldousBroderMazeGenerator.maze, 
  //   maze3_aldousBroderMazeGenerator.currentCell
  // );

  // maze3 = new Maze(
  //   maze3_aldousBroderMazeGenerator.maze,
  //   pS, 
  //   wS,
  //   {
  //     B: wallColor,
  //     S: startColor,
  //     E: endColor,
  //     P: pathColor,
  //     T: "green"
  //   },
  //   null,
  //   maze3_aldousBroderMazeGenerator.currentCell
  // )
  // maze3.draw(ctx);
  
  // sleep(5000);
  // maze.markMaze(ctx, {
  //   content: "", 
  //   color: "white", 
  //   size: maze.wS / 4, 
  //   fontFamily: "Monospace"
  // })

  // if (interval < solution.length)
  //   player.go(solution[interval]);
  // sleep(50);

  // let s = wallFollowerAlgOneStep(player, maze, "L", trace);
  // for (let i = 0; i < trace.length; i++) {
  //   for (let j = 0; j < trace[i].length; j++) {
  //     drawWallFollowerAlgTrace(
  //       ctx, trace[i][j], traceSidePs, traceSideWs, 
  //       j, i, 
  //       maze.pS, maze.wS, 
  //       player1TracingColor
  //     );
  //   }  
  // }
  // if (s != null)
  //   player.goOneStep(s);
  // sleep(player.speed);
  // player.draw(ctx, maze.wS, maze.pS);


  // let s2 = wallFollowerAlgOneStep(player2, maze, "R", trace2);
  // for (let i = 0; i < trace2.length; i++) {
  //   for (let j = 0; j < trace2[i].length; j++) {
  //     drawWallFollowerAlgTrace(
  //       ctx, trace2[i][j], traceSidePs, traceSideWs, 
  //       j, i, 
  //       maze.pS, maze.wS, 
  //       player2TracingColor
  //     );
  //   }  
  // }
  // if (s2 != null)
  //   player2.goOneStep(s2);
  // sleep(player2.speed);
  // player2.draw(ctx, maze.wS, maze.pS);
}

mazeInit();
loop();
mazeGen();
// playerJourney(solution);