getElement = selector => document.querySelector(selector);

setElementAttribute = element => {
  for (let property in element)
    getElement(`#${varToString({element})}`).setAttribute(
      property, element[property]
    );
}