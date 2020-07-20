console.clear();
console.log("First Test");

// Add basic open modal functionality
function openModal(event){
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

// Close modal functionality, improve just for testing html modal code
function closeModal(event){
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

function initNotesStack(){
  notes = [];
}

function saveNote(event){
  let modal_body = document.querySelector('.modal-card-body');
  input = modal_body.getElementsByTagName('textarea')[0];
  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'));
  }else{
    notes = [];
  }
  notes.push(input.value);
  localStorage.setItem('notes', JSON.stringify(notes));
  let note = createNote(input.value);
  document.querySelector('.notes-stack').appendChild(note);
  modal_body.parentElement.parentElement.classList.toggle('is-active');
  input.value= '';

}



let addNote = document.querySelector('.add-note');
addNote.addEventListener('click', openModal);

// add later a generic handler to add close function to modal-close events
let closeNote = document.querySelector('.close-modal');
closeNote.addEventListener('click', closeModal);

let note = document.querySelector('#save-note');
console.log(note);
note.addEventListener('click', saveNote);


/** Create note utilities for note objects */
function createNoteBody(){
  /**  Create note body to create card data dinamically*/
  let column_wraper, column, note_date, note_title, note_brief;
  column_wraper = document.createElement('div');
  column_wraper.classList.add('columns');

  // Internal column
  column = document.createElement('div');
  column.classList.add('column');
  column.classList.add('is-12');

  // elements of a note
  note_date = document.createElement('p');
  note_date.classList.add('note-date');

  note_title = document.createElement('p');
  note_title.classList.add('note-title');

  note_brief = document.createElement('p');
  note_brief.classList.add('note-brief');

  column.appendChild(note_date);
  column.appendChild(note_title);
  column.appendChild(note_brief);

  column_wraper.appendChild(column);
  return column_wraper;
}

function createNote(noteValue){
  /** Create a note and rrender on note stack*/
  let noteBody = createNoteBody()
  let note = document.createElement('div');
  note.classList.add('note');
  note.appendChild(noteBody);
  note.querySelector('.note-title').textContent = noteValue;
  note.querySelector('.note-date').textContent = new Date();
  note.querySelector('.note-brief').textContent = noteValue
  return note;

}
