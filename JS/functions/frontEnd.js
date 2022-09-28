getElement = selector => document.querySelector(selector);

createElement = element => document.createElement(element);

setElementAttribute = (element, selector) => {
  for (let property in element) {
    getElement(selector).setAttribute(
      property, element[property]
    );
  }
}

createMazeForm = () => {
  setElementAttribute(inpMazeWidth, `#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(1) > 
    input
  `);
  setElementAttribute(inpMazeHeight, `#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(2) > 
    input
  `);
  setElementAttribute(inpMazePathSide`#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(3) > 
    input
  `);
  setElementAttribute(inpMazeWallSide, `#mazeController > 
    div:nth-child(2) > 
    ul:nth-child(1) > 
    li:nth-child(2) > 
    ul:nth-child(2) > 
    li:nth-child(4) > 
    input
  `);

  setElementAttribute(inpMazePathColor);
  setElementAttribute(inpMazeWallColor);
  setElementAttribute(inpMazeStartColor);
  setElementAttribute(inpMazeEndColor);
}