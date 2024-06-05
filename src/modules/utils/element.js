// Creates an element
function createNewElement(type, id = null, newClass = null, text = null) {
  const newElement = document.createElement(type);

  if (id !== null) {
    newElement.id = id;
  }

  if (newClass !== null) {
    newElement.classList = newClass;
  }

  if (text !== null) {
    newElement.textContent = text;
  }

  return newElement;
}

// Adds elements to a container element
function addToContainer(container, ...elements) {
  elements.forEach((element) => container.appendChild(element));
}

// Removes existing elements from a container
function clearElements(container) {
  container.textContent = ''; 
}

// Creates text or date inputs
function createInput(name, type, divClass, inputClass) {
    const div = createNewElement('div', null, divClass);
    const label = createNewElement('label', null, null, capitalizeFirstLetter(name));
    const input = createNewElement('input', null, inputClass);
    input.type = type;

    addToContainer(div, label, input);
    return div;
}

// Creates select inputs
function createSelectInputs(labelName, divClassName, inputClassName, optionsArray) {
    const div = createNewElement('div', null, divClassName);
    const label = createNewElement('label', null, null, labelName);
    const select = createNewElement('select', null, inputClassName);
    select.name = labelName;

    for (let i = 0; i < optionsArray.length; i++) {
        const option = createNewElement('option', null, null, optionsArray[i]);
        option.value = optionsArray[i];
        addToContainer(select, option);
    }

    addToContainer(div, label, select);
    return div;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { 
    createNewElement, 
    addToContainer, 
    clearElements,
    createInput,
    createSelectInputs 
}