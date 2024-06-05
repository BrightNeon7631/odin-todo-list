import Plus from '../assets/plus.svg';
import Account from '../assets/account-circle.svg';
import { 
    createNewElement, 
    addToContainer,
    createInput,
    createSelectInputs
} from './utils/element';

function leftPanel() {
    const content = document.getElementById('content');
    
    // 1) Left container
    const leftContainer = createNewElement('div', 'left-container');

    // 2) 'Todo List' text
    const leftContainerH1 = createNewElement('h1', null, null, 'Todo List');

    // 3) 'Projects' text & 'Plus' icon
    const projectsDiv = createNewElement('div', 'projects-div');
    const projectsH2 = createNewElement('h2', null, null, 'Projects');
    const projectsAdd = createNewElement('div', 'projects-add');
    
    const plusIcon = createNewElement('img');
    plusIcon.src = Plus;
    plusIcon.alt = 'Add Project'
    
    // 4) Projects created by the user
    const projectsList = createNewElement('ul', 'projects-ul');

    // 5) Append
    addToContainer(projectsAdd, plusIcon);
    addToContainer(projectsDiv, projectsH2, projectsAdd);
    addToContainer(leftContainer, leftContainerH1, projectsDiv, projectsList);
    addToContainer(content, leftContainer);
}

function rightPanel() {
    const content = document.getElementById('content');

    // 1) Right container
    const rightContainer = createNewElement('div', 'right-container')

    // 2) Headers
    const header = createNewElement('div', null, 'header');
    const headerLeft = createNewElement('div', null, 'header-left');
    
    const accountimage = createNewElement('img');
    accountimage.alt = 'Account';
    accountimage.src = Account;

    const headerHi = createNewElement('div', null, 'header-hi');
    const headerHi1 = createNewElement('div', null, null, 'Welcome back and good luck.');
    const headerHi2 = createNewElement('div', null, null, 'Morgan Oakley (@morgan)');

    // 3) Buttons
    const buttonsDiv = createNewElement('div', null, 'header-buttons');
    // a) 'Add Task' button
    const addButton = createNewElement('button', 'button-input', null, 'Add Task');
    // b) 'Clear Checked' button
    const removeCheckedButton = createNewElement('button', 'button-remove', null, 'Clear Checked');

    // 4) Items created by the user
    const itemsDiv = createNewElement('div', 'items-div');

    // 5) Append
    addToContainer(headerHi, headerHi1, headerHi2);
    addToContainer(headerLeft, accountimage, headerHi);
    addToContainer(buttonsDiv, addButton, removeCheckedButton);
    addToContainer(header, headerLeft, buttonsDiv);
    addToContainer(rightContainer, header, itemsDiv);
    addToContainer(content, rightContainer);
}

function createProjectPopup() {
    const content = document.getElementById('content');

    const container = createNewElement('div', 'popup-container-project');
    const title = createNewElement('h4', null, null, 'Project name');
    const divProjectName = createNewElement('input', 'add-bar');
    divProjectName.type = 'text';

    // Buttons
    const button = createNewElement('button', 'project-button', null, 'Create');

    // Append
    addToContainer(container, title, divProjectName, button);
    addToContainer(content, container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = createNewElement('div', 'overlay');
        addToContainer(content, overlay);
    }
}

function createItemPopup() {
    const content = document.getElementById('content');

    const container = createNewElement('div', 'popup-container-item');

    // Add task text
    const divTitle = createNewElement('div', 'popup-title-item', null, 'Add Task');
    const divContent = createNewElement('div', 'popup-input-container-item');

    // Text and date inputs
    const popupTitle = createInput('title', 'text', 'item-input-div', 'item-input');
    const popupDesc = createInput('description', 'text', 'item-input-div', 'item-input');
    const popupDate = createInput('date', 'date', 'item-input-div', 'item-input');

    // Select inputs
    const selectOptionsArray = ['Low', 'Medium', 'High'];
    const popupPriority = createSelectInputs('Priority', 'item-input-div', 'item-input', selectOptionsArray);

    // Buttons
    const button = createNewElement('button', 'popup-button-item', null, 'Add');

    // Append
    addToContainer(divContent, popupTitle, popupDesc, popupDate, popupPriority);
    addToContainer(container, divTitle, divContent, button);
    addToContainer(content, container);
    
    if (document.getElementById('overlay') == undefined) {
        const overlay = createNewElement('div', 'overlay');
        addToContainer(content, overlay);
    }
}

function editItemPopup() {
    const content = document.getElementById('content');

    const container = createNewElement('div', 'popup-container-edit')
    const divTitle = createNewElement('div', 'popup-title-edit', null, 'Edit Task');
    const divContent = createNewElement('div', 'popup-input-container-edit');

    // Create text and date inputs
    const popupTitle = createInput('title', 'text', 'input-item-popup', 'edit-popup-input');
    const popupDesc = createInput('description', 'text', 'input-item-popup', 'edit-popup-input');
    const popupDate = createInput('date', 'date', 'input-item-popup', 'edit-popup-input');

    // Create select input
    const selectOptionsArray = ['Low', 'Medium', 'High'];
    const popupPriority = createSelectInputs('Priority', 'input-item-popup', 'edit-popup-input', selectOptionsArray);

    // Buttons
    const button = createNewElement('button', 'popup-button-edit', null, 'Update');

    // Append
    addToContainer(divContent, popupTitle, popupDesc, popupDate, popupPriority);
    addToContainer(container, divTitle, divContent, button);
    addToContainer(content, container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = createNewElement('div', 'overlay');
        addToContainer(content, overlay);
    }
}

function selectItemPopup(title, desc, date, priority) {
    const content = document.getElementById('content');

    const container = createNewElement('div', 'popup-container-2');

    // Inputs
    const h4Title = createNewElement('h4', null, null, 'Title');
    const divTitle = createNewElement('div', 'popup-title', null, title);
    const h4Desc = createNewElement('h4', null, null, 'Description');
    const divDesc = createNewElement('div', null, null, desc);
    const h4Date = createNewElement('h4', null, null, 'Date');
    const divDate = createNewElement('div', null, null, date);
    const h4Priority = createNewElement('h4', null, null, 'Priority');
    const divPriority = createNewElement('div', null, null, priority);

    // Append
    addToContainer(container, h4Title, divTitle, h4Desc, divDesc, h4Date, divDate, h4Priority, divPriority);
    addToContainer(content, container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = createNewElement('div', 'overlay');
        addToContainer(content, overlay);
    }
}

export { 
    leftPanel, 
    rightPanel, 
    editItemPopup, 
    selectItemPopup, 
    createProjectPopup, 
    createItemPopup 
}