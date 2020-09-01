// Functions
// import { EventListeners } from './functions.js';
import { App } from './app.js'

const app = new App();

export function EventListeners() {

  // modals listeners
  document.querySelector('.add-note').addEventListener('click', app.ui.openNoteModal);
  document.querySelector('.close-modal').addEventListener('click', app.ui.closeModal);
  document.querySelector('#change-color').addEventListener('click', app.ui.openColorSelectorModal);

  // listener to save notes
  document.querySelector('#save-note').addEventListener('click', function () { app.saveNote() });


  // add events to change note colors
  const colorButtons = document.querySelectorAll('.color-selector');
  colorButtons.forEach((button) => {
    button.addEventListener('click', app.ui.changeAppColor);
  });

  // add listeners to all cards to edit notes
  const noteStack = document.querySelector('.notes-stack');
  noteStack.addEventListener('click', handleStackEvents);
  document.addEventListener('DOMContentLoaded', loadNotes);
}

function handleStackEvents(event) {
  if (
    event.target.classList.contains('note')
    || event.target.classList.contains('note-brief')
    || event.target.classList.contains('note-title')
    || event.target.classList.contains('note-date')
    || event.target.classList.contains('column')
    || event.target.classList.contains('columns')
  ) {
    app.editNote(event);
  } else if (event.target.dataset.action === 'delete') {
    app.deleteNote(event);
  }
}

function loadNotes(){
  const stack = document.querySelector('.notes-stack');
  // update localStorage settings
  if (localStorage.getItem('settings')) {
    document.getElementsByTagName('html')[0].style.backgroundColor = JSON.parse(localStorage.getItem('settings')).bgColor;
  } else {
    const settings = {
      bgColor: '#feff9c',
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  const notes = JSON.parse(localStorage.getItem('notes'));
  notes.forEach((note) => {
    stack.appendChild(app.createNoteElement(note));
  });
}

EventListeners();
