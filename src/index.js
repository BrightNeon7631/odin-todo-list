import './style/index.css';
import { 
    leftPanel, 
    rightPanel 
} from './modules/home.js';
import {
  addProjectButtonClick,
  addItemButtonClick,
  removeCheckedButtonClick,
  getFromStorage,
} from './modules/projectsEvents';

// Generate html
leftPanel();
rightPanel();

// Get data from local storage
getFromStorage();

// Adding a new project
const addProjectButton = document.getElementById('projects-add');
addProjectButton.addEventListener('click', addProjectButtonClick);

// Clearing checked tasks
const removeCheckedButton = document.getElementById('button-remove');
removeCheckedButton.addEventListener('click', removeCheckedButtonClick);

// Adding a new task
const addItemButton = document.getElementById('button-input');
addItemButton.addEventListener('click', addItemButtonClick);
