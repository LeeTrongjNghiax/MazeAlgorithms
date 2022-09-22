getElement = selector => document.querySelector(selector);

createElement = element => document.createElement(element);

setElementAttribute = element => {
  for (let property in element) {
    getElement("#" + element.id).setAttribute(
      property, element[property]
    );
  }
}

createMazeForm = () => {
  setElementAttribute(inpMazeWidth);
  setElementAttribute(inpMazeHeight);
  setElementAttribute(inpMazePathSide);
  setElementAttribute(inpMazeWallSide);

  setElementAttribute(inpMazePathColor);
  setElementAttribute(inpMazeWallColor);
  setElementAttribute(inpMazeStartColor);
  setElementAttribute(inpMazeEndColor);

  setElementAttribute(inpNpc1Speed);
  setElementAttribute(inpNpc1Color);
  setElementAttribute(inpNpc1TracingColor);

  setElementAttribute(inpNpc2Speed);
  setElementAttribute(inpNpc2Color);
  setElementAttribute(inpNpc2TracingColor);

  getElement(`#${inpMazeWidth.id}`).innerHTML = inpMazeWidth.value;
}