console.clear();
console.log("First Test");

// EventListeners
function EventListeners(){

  // listeners to add notes
  document.querySelector('.add-note').addEventListener('click', openModal);

  // listeners to close modals
  document.querySelector('.close-modal').addEventListener('click', closeModal);

  // listener to save notes
  document.querySelector('#save-note').addEventListener('click', saveNote);

  // add listeners to all cards to edit notes
  // Refactoring this to use delegation
  let noteStack = document.querySelector('.notes-stack');
  noteStack.addEventListener('click', handleStackEvents);
  //let notes = document.querySelector('.notes-stack').children;
  //for(let note of notes){
  //  note.addEventListener('click', editNote);
  //}

}

EventListeners();

// Functions
function openModal(event){
  // Add basic open modal functionality
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

function closeModal(event){
  // Close modal functionality, improve just for testing html modal code
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

function saveNote(event){
  let modal_body, note;

  // search for input text area
  modal_body = document.querySelector('.modal-card-body');
  input = modal_body.getElementsByTagName('textarea')[0];

  // here we will create note object
  let noteObj = _createNoteObject(input.value)
  note = _createNoteElement(noteObj);

  // create note in localStorage
  saveNoteInBrowser(noteObj)

  // append note in notes-stack and clean input field
  document.querySelector('.notes-stack').appendChild(note);
  modal_body.parentElement.parentElement.classList.toggle('is-active');
  input.value= '';

}

function handleStackEvents(event){

  if(
      event.target.classList.contains('note') ||
      event.target.classList.contains('note-brief') ||
      event.target.classList.contains('note-title') ||
      event.target.classList.contains('note-date') ||
      event.target.classList.contains('column') ||
      event.target.classList.contains('columns')
  ){
    editNote(event);
  }else if(event.target.dataset.action == 'delete'){
    deleteNote(event);
  }

}

function editNote(event){
  // open note in note editor window
  let content = event.target.parentElement.querySelector('.note-title').textContent;
  let note_content = document.getElementById('note-content').getElementsByTagName('textarea')[0];
  note_content.textContent = content;
}

function deleteNote(event){
  event.stopPropagation()
  event.target.parentElement.parentElement.parentElement.remove()
}

function saveNoteInBrowser(noteObj){
  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'));
  }else{
    notes = [];
  }
  notes.push(noteObj);
  localStorage.setItem('notes', JSON.stringify(notes));
}

/** Create note utilities for note objects */
function _createNoteObject(value){
  // Create my note object to stringify
  return {
    'title': value,
    'createdAt': new Date().toDateString(),
    'brief':  String(value).substring(0, value.length/2),
    'position': 1
    //'position': _get_note_position()
  }

}

function _createNoteBody(){
  /**  Create note body to create card data dinamically*/
  let column_wraper, column, note_date, note_title, note_brief, button;
  column_wraper = document.createElement('div');
  column_wraper.classList.add('columns');

  // Internal column
  column = document.createElement('div');
  column.classList.add('column', 'is-12');

  // elements of a note
  note_date = document.createElement('p');
  note_date.classList.add('note-date');

  note_title = document.createElement('p');
  note_title.classList.add('note-title');

  note_brief = document.createElement('p');
  note_brief.classList.add('note-brief', 'subtitle');

  button = document.createElement('button');
  button.classList.add('button', 'delete-note', 'is-danger', 'is-small');
  button.dataset.action = 'delete';
  button.textContent = "Delete";

  column.appendChild(note_date);
  column.appendChild(note_title);
  column.appendChild(note_brief);
  column.appendChild(button);

  column_wraper.appendChild(column);
  return column_wraper;
}

function _createNoteElement(noteObj){
  /** Create a note and render on note stack*/
  let noteBody, note;
  noteBody = _createNoteBody()
  note = document.createElement('div');
  note.classList.add('note');
  note.appendChild(noteBody);
  note.querySelector('.note-title').textContent = noteObj.title;
  note.querySelector('.note-date').textContent = noteObj.createdAt;
  note.querySelector('.note-brief').textContent = noteObj.brief;
  note.onclick = editNote;
  return note;

}
