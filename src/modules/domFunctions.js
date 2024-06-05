import '../style/home.css';
import Trash from '../assets/delete.svg';
import Edit from '../assets/pencil.svg';
import Project from './classes.js'; 
import { 
    clearElements, 
    addToContainer, 
    createNewElement 
} from './utils/element';
import { 
    deleteProjectButtonClick, 
    selectProjectClick, 
    currentPositionInArray, 
    deleteItemButtonClick, 
    editItemButtonClick, 
    changeCheckboxClick, 
    selectItemClick, 
    currentProjectID, 
    addToStorage, 
    projectsArray 
} from './projectsEvents';

// 1) Adding projects and items
// a) Adds a new project to the left side
function addNewProject(projectName, projectId) {
    const li = createNewElement('li');
    // Remembers the project's id
    li.setAttribute('data-no', projectId);
    const aTitle = createNewElement('div', null, 'project-title', projectName);
    const aTrash = createNewElement('div', null, 'project-trash');
    const trashIcon = createNewElement('img');
    trashIcon.src = Trash;
    trashIcon.alt = 'Delete Project';

    addToContainer(aTrash, trashIcon);
    addToContainer(li, aTitle, aTrash);
    return li;
}

// b) Adds a new task to the right side
function addNewItem(title, desc, date, priority, checkStatus, arrayPosition) {
    const listItem = createNewElement('div', null, 'list-item');
    // Remebers the task's position in the array of projects
    listItem.setAttribute('data-item-no', arrayPosition);

    // Checkbox
    const checkbox = createNewElement('input', null, 'list-item-check');
    checkbox.type = 'checkbox';
    checkbox.checked = checkStatus;

    // Content
    const itemContent = createNewElement('div', null, 'list-item-content');
    // Strikethrough text if checkStatus is true
    strikethroughIfChecked(itemContent, checkStatus);
    const itemContentTitle = createNewElement('div', null, 'list-item-title', title);
    const itemContentBottom = createNewElement('div', null, 'list-item-content-bottom');
    const itemDesc = createNewElement('div', null, 'list-item-desc', desc);
    const itemDate = createNewElement('div', null, 'list-item-date', date);
    const itemPriority = createNewElement('div', null, 'list-item-priority', priority);

    // Icons
    const itemIcons = createNewElement('div', null, 'list-item-icons');
    const aEdit = createNewElement('div', null, 'item-edit');
    const editIcon = createNewElement('img');
    editIcon.src = Edit;
    editIcon.alt = 'Edit Item';
    const aTrash = createNewElement('div', null, 'item-trash');
    const trashIcon = createNewElement('img');
    trashIcon.src = Trash;
    trashIcon.alt = 'Delete Item';

    // Append
    addToContainer(aEdit, editIcon);
    addToContainer(aTrash, trashIcon);
    addToContainer(itemIcons, aEdit, aTrash);
    addToContainer(itemContentBottom, itemDesc, itemDate, itemPriority);
    addToContainer(itemContent, itemContentTitle, itemContentBottom);
    addToContainer(listItem, checkbox, itemContent, itemIcons);
    return listItem;
}

// Adds strikethrough text effect to the task's elements
function strikethroughIfChecked(element, ifCkecked) {
    if (ifCkecked == true) {
        element.classList = 'strikethrough';
    }
}

// 2) Refresh / generate content
// a) Refreshes projects and tasks; contains event listeners
function refreshProjectsList() {
    // Displays projects on the left
    const projectsList = document.getElementById('projects-ul');
    // Clears exisitng project elements first to avoid duplicates
    clearElements(projectsList);
    generateProjectsList(projectsList, projectsArray);

    // Deletes a project after clicking the trash icon
    const deleteProjectButton = document.querySelectorAll('.project-trash');
    deleteProjectButton.forEach(trash => trash.addEventListener('click', deleteProjectButtonClick));

    // Selects a project after clicking on one
    const selectProject = document.querySelectorAll('.project-title');
    selectProject.forEach(select => select.addEventListener('click', selectProjectClick));

    // Highlights the selected project
    const highlightProject = document.querySelector(`[data-no="${currentProjectID}"]`);
    if (highlightProject !== null) {
        highlightProject.classList = 'highlighted-project';
    }

    // Displays tasks on the right
    const itemsList = document.getElementById('items-div');
    clearElements(itemsList);
    generateItemList(itemsList, projectsArray[currentPositionInArray], 'items');

    // Deletes a task after clicking the trash icon
    const deleteItemButton = document.querySelectorAll('.item-trash');
    deleteItemButton.forEach(trash => trash.addEventListener('click', deleteItemButtonClick));

    // Checks / unchecks tasks
    const changeCheckbox = document.querySelectorAll('.list-item-check');
    changeCheckbox.forEach(box => box.addEventListener('click', changeCheckboxClick));

    // Displays the task edit popup after clicking the pencil icon
    const editItemButton = document.querySelectorAll('.item-edit');
    editItemButton.forEach(edit => edit.addEventListener('click', editItemButtonClick));

    // Displays a popup with a task's content
    const selectItem = document.querySelectorAll('.list-item-content');
    selectItem.forEach(select => select.addEventListener('click', selectItemClick));

    // Adds data to local storage
    addToStorage();
}

// b) Iterates through the array of projects and adds them to the ul container
function generateProjectsList(ULelement, array) {
    for (let i = 0; i < array.length; i++) {
        addToContainer(ULelement, addNewProject(array[i].name, array[i].id));
    }
}

// c) Iterates through the array of tasks and adds them to the div container
function generateItemList(divParent, array, property) {
    if (array === undefined) {
        return;
    }
    const items = array[property];

    // Iterates through the array of tasks inside a project object
    for (let i = 0; i < items.length; i++) {
        // Temporarly holds the values of each key (like title's value)
        const itemValue = []
        for (let key in items[i]) {
            itemValue.push(items[i][key]);
        }
        addToContainer(divParent, addNewItem(itemValue[0], itemValue[1], itemValue[2], itemValue[3], itemValue[4], i));
    }
}

// 3) Creates an example project with two tasks
function sampleProjectAndItems() {
    let project1 = new Project('Project 1');
    projectsArray.push(project1);
    project1.addItems('Task 1', 'Additional info.', '2022-10-31', 'High');
    project1.addItems('Task 2', 'More info.', '2022-10-31', 'Low');
}

export { 
    refreshProjectsList, 
    sampleProjectAndItems
}