import Project from './classes.js';
import { 
    refreshProjectsList, 
    sampleProjectAndItems 
} from './domFunctions.js';
import { 
    editItemPopup, 
    selectItemPopup, 
    createProjectPopup, 
    createItemPopup 
} from './home.js'

// Array with project objects
const projectsArray = [];
// Remembers the currently selected project's position in the array
let currentPositionInArray = 0;
// Remembers the currently selected project's id number (useful for the highlighting feature)
let currentProjectID = 0;

// I PROJECTS
// 1) addProjectButton event (index.js)
// a) First it displays the 'Add Project' popup window
function addProjectButtonClick() {
    if (document.getElementById('popup-container-project') == undefined) {
        createProjectPopup();
    }
    const popup = document.getElementById('popup-container-project');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const confirmCreate = document.getElementById('project-button');
    confirmCreate.addEventListener('click', confirmCreateClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and pushes the new project object to the array
function confirmCreateClick() {
    const popup = document.getElementById('popup-container-project');
    const addProjectInput = document.getElementById('add-bar');
   
    if (checkInputValue(addProjectInput.value, 'Project name cannot be empty.') === true) {
        return;
    }
    
    const newProject = new Project(addProjectInput.value);
    projectsArray.push(newProject);
    popup.classList.remove('active');
    overlay.classList.remove('active');
    addProjectInput.value = '';
    makeNewProjectActive(newProject.id, projectsArray);
    refreshProjectsList();
}

// c) Changes these variable values, so that the refresh function can set the newly created project as active / currently selected
function makeNewProjectActive(id, array) {
    // the new project was pushed to the end of the array, so the last project object in the array becomes active
    currentPositionInArray = array.length - 1;
    currentProjectID = id;
}

// 2) deleteProjectButton event (domFunctions.js -> refreshProjectsList function)
// a) Removes a project
function deleteProjectButtonClick(e) {
    // goes to the parent node (li element) and gets the data-no value (which is equal to the id)
    let dataObjNo = parseInt(e.currentTarget.parentNode.getAttribute('data-no'));
    determineNewActiveProject(projectsArray, dataObjNo);
    removeProjectFromArray(projectsArray, dataObjNo);
    // If the project to be deleted is not the currently selected one, then it should remain active. 
    // This project's position in the array has to be relocated (project's id didn't change but the position in the array did).
    currentPositionInArray = determinePositionInArray(projectsArray, currentProjectID);
    refreshProjectsList();
}

// b) The actual function responsible for removing the project from the array
function removeProjectFromArray(array, IDvalue) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == IDvalue) {
            array.splice(i, 1);
            return;
        }
    }
}

// c) Determines which project should be active next in case of deleting the currently selected one
function determineNewActiveProject(array, IDvalue) {
    let position = determinePositionInArray(array, IDvalue);

    // if the currently selected project is the same one we want to delete
    if (currentProjectID === IDvalue && array.length > 1) {
        // sets the project above as the active one (i.e previous project in the array if there is one)
        if (array[position - 1] !== undefined) {
            currentPositionInArray = position - 1;
            currentProjectID = array[position - 1].id;
          // if the selected project is the first one (no other projects above it) then the project below will become active
        } else {
            currentPositionInArray = 0;
            // second item in the array since it'll become first (position 0) after the refresh function runs
            currentProjectID = array[1].id;
        }
    }
}

// 3) selectProjectClick event (domFunctions.js -> refreshProjectsList function)
// a) Assigns the project's current position in the array (based on the id parameter) to the variable and runs the refresh function, 
// so that all its items can show up
function selectProjectClick(e) {
    let id = parseInt(e.currentTarget.parentNode.getAttribute('data-no'));
    currentPositionInArray = determinePositionInArray(projectsArray, id);
    // for highlightProject function
    currentProjectID = id;
    refreshProjectsList();
}

// b) Determines the project object's position in the array, since its position and id property might differ
function determinePositionInArray(array, IDvalue) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == IDvalue) {
            return i;
        }
    }
}

// II TASKS
// 1) addItemButton event (index.js)
// a) First it displays the 'Add Task' popup window
function addItemButtonClick() {
    // there has to be a selected project (at least one has to exist)
    if (projectsArray[currentPositionInArray] === undefined) {
        return;
    }

    if (document.getElementById('popup-container-item') == undefined) {
        createItemPopup();
    }

    const popup = document.getElementById('popup-container-item');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const addItem = document.getElementById('popup-button-item');
    addItem.addEventListener('click', addItemClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and pushes the task to the array of tasks inside a selected project object
function addItemClick() {
    const popup = document.getElementById('popup-container-item');
    const overlay = document.getElementById('overlay');

    const allInputs = document.querySelectorAll('.item-input');
    if (
      checkInputValue(allInputs[0].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[1].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[2].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[3].value, 'Value cannot be empty.')
    ) {
      console.log('wrong value');
    } else {
      projectsArray[currentPositionInArray].addItems(
        allInputs[0].value,
        allInputs[1].value,
        allInputs[2].value,
        allInputs[3].value
      );
      
      popup.classList.remove('active');
      overlay.classList.remove('active');

      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = '';
      }

      refreshProjectsList();
    }
}

// 2) deleteItemButton event (domFunctions.js -> refreshProjectsList function)
// Deletes a task from an array of tasks inside a project object
function deleteItemButtonClick(e) {
    // data-item-no attribute = position in the tasks array
    let dataObjNo = parseInt(e.currentTarget.parentNode.parentNode.getAttribute('data-item-no'));
    projectsArray[currentPositionInArray].removeItem(dataObjNo);
    refreshProjectsList();
}

// 3) changeCheckbox event (domFunctions.js -> refreshProjectsList function)
// Sets the checkbox property to either true or false
function changeCheckboxClick(e) {
    let dataObjNo = parseInt(e.currentTarget.parentNode.getAttribute('data-item-no'));
    let checkboxValue = projectsArray[currentPositionInArray].items[dataObjNo].checkbox;
    if (checkboxValue == false) {
        // toggle on
        projectsArray[currentPositionInArray].items[dataObjNo].checkbox = true;
    } else {
        // toggle off
        projectsArray[currentPositionInArray].items[dataObjNo].checkbox = false;
    }
    refreshProjectsList();
}

// 4) editItemButton event (domFunctions.js -> refreshProjectsList function)
// a) Gets the selected tasks's position in the array, displays the 'Edit Task' popup window and fills the inputs with existing data
let editItemNo;
function editItemButtonClick(e) {
    editItemNo = parseInt(e.currentTarget.parentNode.parentNode.getAttribute('data-item-no'));
    if (document.getElementById('popup-container-edit') == undefined) {
        editItemPopup();
    }

    const allInputs = document.querySelectorAll('.edit-popup-input');
    fillEditPopupInputs(allInputs, projectsArray[currentPositionInArray], 'items', editItemNo);
    const popup = document.getElementById('popup-container-edit');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const confirmChange = document.getElementById('popup-button-edit');
    confirmChange.addEventListener('click', confirmChangeClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and changes the task object in the tasks array inside the project object
function confirmChangeClick() {
    const popup = document.getElementById('popup-container-edit');
    const overlay = document.getElementById('overlay');

    const allInputs = document.querySelectorAll('.edit-popup-input');
    if (
      checkInputValue(allInputs[0].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[1].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[2].value, 'Value cannot be empty.') ||
      checkInputValue(allInputs[3].value, 'Value cannot be empty.')
    ) {
      console.log('wrong value');
    } else {
      projectsArray[currentPositionInArray].changeItem(
        editItemNo,
        allInputs[0].value,
        allInputs[1].value,
        allInputs[2].value,
        allInputs[3].value
      );
      
      popup.classList.remove('active');
      overlay.classList.remove('active');
      refreshProjectsList();
    }
}

// c) Fills the 'Edit Task' popup inputs with existing data
function fillEditPopupInputs(inputs, array, property, position) {
    const items = array[property];
    // holds the values of each key except for checkbox
    const itemValue = [];
    for (let key in items[position]) {
        if (key != 'checkbox') {
            itemValue.push(items[position][key]);
        }
    }
    
    for (let i = 0; i < itemValue.length; i++) {
        inputs[i].value = itemValue[i];
    }
}

// 5) selectItem event (domFunctions.js -> refreshProjectsList function)
// Displays the popup window with all the details
function selectItemClick(e) {
    let dataObjNo = parseInt(e.currentTarget.parentNode.getAttribute('data-item-no'));

    let itemData = projectsArray[currentPositionInArray].items[dataObjNo];
    selectItemPopup(itemData.title, itemData.desc, itemData.date, itemData.priority)

    const popup = document.getElementById('popup-container-2');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    closePopupOverlay(popup, overlay);
}

// III MISC. 
// 1) removeCheckedButton event (index.js)
// Removes all checked tasks with the 'Clear Checked' button
function removeCheckedButtonClick() {
    const checkboxListItems = document.querySelectorAll('.list-item-check');
    let items = projectsArray[currentPositionInArray].items;

    // If we iterated only through items.length, the item would get removed and the position in the array would change. 
    // So if we have 2 or  more items to remove everything has to be run twice.
    for (let i = 0; i < checkboxListItems.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j].checkbox == true) {
                projectsArray[currentPositionInArray].removeItem(j);
            }
        }
    }
    refreshProjectsList();
}

// 2) Checks if an input value is empty or starts with an empty string
function checkInputValue(element, message) {
    if (element == '' || element.startsWith(' ')) {
        alert(message);
        return true;
    }
}

// 3) Removes the popup window when the user clicks outside of it
function closePopupOverlay(popup, overlay) {
    overlay.addEventListener('click', closePopup);
    function closePopup() {
        popup.remove();
        overlay.remove();
    }
}

// IV Local Storage
// 1) Adds the array of projects to local storage
function addToStorage() {
    // JSON.stringify changes the array into a string
    window.localStorage.setItem('projectsArrayLS', JSON.stringify(projectsArray)); 
}

// 2) Gets data from local storage
function getFromStorage() {
    // JSON.parse changes that string back to an array
    let localStorageData = JSON.parse(window.localStorage.getItem('projectsArrayLS')); 
    if (localStorageData !== null) {
        projectsArrayReplaceLS(localStorageData);
        refreshProjectsList();
    } else {
        sampleProjectAndItems();
        refreshProjectsList();
    }
}

// 3) Takes data from local storage and creates brand new objects and pushes them to the array of projects 
// Local storage doesn't save object's functions and prototypes. Workaround: get data from local storage and create brand new objects.
function projectsArrayReplaceLS(localStorageData) {
    for (let i = 0; i < localStorageData.length; i++) {
        const newProject = new Project(localStorageData[i].name);
        const lsItems = localStorageData[i].items;
        for (let j = 0; j < lsItems.length; j++) {
            const itemValue = []
            for (let key in lsItems[j]) {
                itemValue.push(lsItems[j][key]);
            }
            newProject.addItems(itemValue[0], itemValue[1], itemValue[2], itemValue[3], itemValue[4]);
        }
        projectsArray.push(newProject);
    }
}

export { 
    addProjectButtonClick, 
    deleteProjectButtonClick, 
    addItemButtonClick, 
    selectProjectClick, 
    currentPositionInArray, 
    deleteItemButtonClick, 
    editItemButtonClick, 
    changeCheckboxClick, 
    removeCheckedButtonClick, 
    selectItemClick, 
    currentProjectID,
    addToStorage, 
    getFromStorage, 
    projectsArray 
}