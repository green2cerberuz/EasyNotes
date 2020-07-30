// Functions

function editNote(event) {
  // open note in note editor window
  const content = event.target.parentElement.querySelector('.note-title').textContent;
  const noteContent = document.getElementById('note-content').getElementsByTagName('textarea')[0];
  noteContent.textContent = content;
}

function deleteNote(event) {
  event.stopPropagation();
  event.target.parentElement.parentElement.parentElement.remove();
}

function saveNoteInBrowser(noteObj) {
  let notes;
  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  } else {
    notes = [];
  }
  notes.push(noteObj);
  localStorage.setItem('notes', JSON.stringify(notes));
}

/** Create note utilities for note objects */
// eslint-disable-next-line no-underscore-dangle
function _createNoteObject(title, body) {
  // Create my note object to stringify
  return {
    title,
    body,
    position: 1,
    createdAt: new Date().toDateString(),
    brief: String(body).substring(0, body.length / 2),
    // 'position': _get_note_position()
  };
}

// eslint-disable-next-line no-underscore-dangle
function _createNoteBody() {
  /**  Create note body to create card data dinamically */
  const columnWraper = document.createElement('div');
  columnWraper.classList.add('columns');

  // Internal column
  const column = document.createElement('div');
  column.classList.add('column', 'is-12');

  // elements of a note
  const noteDate = document.createElement('p');
  noteDate.classList.add('note-date');

  const noteTitle = document.createElement('p');
  noteTitle.classList.add('note-title');

  const noteBrief = document.createElement('p');
  noteBrief.classList.add('note-brief', 'subtitle');

  const button = document.createElement('button');
  button.classList.add('button', 'delete-note', 'is-danger', 'is-small');
  button.dataset.action = 'delete';
  button.textContent = 'Delete';

  column.appendChild(noteDate);
  column.appendChild(noteTitle);
  column.appendChild(noteBrief);
  column.appendChild(button);

  columnWraper.appendChild(column);
  return columnWraper;
}

// eslint-disable-next-line no-underscore-dangle
function _createNoteElement(noteObj) {
  /** Create a note element, with classes and event */
  const noteBody = _createNoteBody();
  const note = document.createElement('div');
  note.classList.add('note');
  note.appendChild(noteBody);
  note.querySelector('.note-title').textContent = noteObj.title;
  note.querySelector('.note-date').textContent = noteObj.createdAt;
  note.querySelector('.note-brief').textContent = noteObj.brief;
  note.onclick = editNote;
  return note;
}

function localStorageOnLoad() {
  const stack = document.querySelector('.notes-stack');
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
    stack.appendChild(_createNoteElement(note));
  });
}

function openColorSelectorModal() {
  document.querySelector('#modal-change-color').classList.toggle('is-active');
}

function openModal() {
  // Add basic open modal functionality
  const modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

function closeModal() {
  // Close modal functionality, improve just for testing html modal code
  const modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

function changeAppColor(event) {
  const color = getComputedStyle(event.target).backgroundColor;
  document.getElementsByTagName('html')[0].style.backgroundColor = color;

  // Save new settings in localStorage.
  const settings = JSON.parse(localStorage.getItem('settings'));
  settings.bgColor = color;
  localStorage.setItem('settings', JSON.stringify(settings));
  // Analyze a better user experience
  event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle('is-active');
}

function saveNote() {
  // search for input text area
  const modalBody = document.querySelector('.modal-card-body');
  const inputTitle = modalBody.getElementsByTagName('input')[0];
  const inputBody = modalBody.getElementsByTagName('textarea')[0];

  // here we will create note object
  const noteObj = _createNoteObject(inputTitle.value, inputBody.value);
  const note = _createNoteElement(noteObj);

  // create note in localStorage
  saveNoteInBrowser(noteObj);

  // append note in notes-stack and clean input field
  document.querySelector('.notes-stack').appendChild(note);
  modalBody.parentElement.parentElement.classList.toggle('is-active');
  inputBody.value = '';
  inputTitle.value = '';
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
    editNote(event);
  } else if (event.target.dataset.action === 'delete') {
    deleteNote(event);
  }
}

// EventListeners
function EventListeners() {
  // listeners to add notes
  document.querySelector('.add-note').addEventListener('click', openModal);

  // listeners to close modals
  document.querySelector('.close-modal').addEventListener('click', closeModal);

  // listener to save notes
  document.querySelector('#save-note').addEventListener('click', saveNote);

  // add event to change app color
  document.querySelector('#change-color').addEventListener('click', openColorSelectorModal);

  // add eventos to change note colors
  const colorButtons = document.querySelectorAll('.color-selector');
  colorButtons.forEach((button) => {
    button.addEventListener('click', changeAppColor);
  });

  // add listeners to all cards to edit notes
  const noteStack = document.querySelector('.notes-stack');
  noteStack.addEventListener('click', handleStackEvents);
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

EventListeners();
