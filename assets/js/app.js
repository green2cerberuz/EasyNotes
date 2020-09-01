import { UI } from './UI.js';


export class App {

  constructor(){
    this.ui = new UI();
  }

  // event handlers which does not need class context
  editNote(event){
    const content = event.target.parentElement.querySelector('.note-title').textContent;
    const noteContent = document.getElementById('note-content').getElementsByTagName('textarea')[0];
    noteContent.textContent = content;
  }

  deleteNote(event){
    event.stopPropagation();
    event.target.parentElement.parentElement.parentElement.remove();
  }

  // create note objects and save them

  createNoteObject(title, body) {
    return {
      title,
      body,
      position: 1,
      createdAt: new Date().toDateString(),
      brief: String(body).substring(0, body.length / 2),
    }
  }

  createNoteElement(noteObj) {
    const noteBody = this.ui.createNoteBody();
    console.log(noteBody)
    const note = document.createElement('div');
    note.classList.add('note');
    note.appendChild(noteBody);
    note.querySelector('.note-title').textContent = noteObj.title;
    note.querySelector('.note-date').textContent = noteObj.createdAt;
    note.querySelector('.note-brief').textContent = noteObj.brief;
    note.onclick = this.editNote;
    return note;
  }

  saveNoteInBrowser(noteObj) {
    let notes;
    if (localStorage.getItem('notes')) {
      notes = JSON.parse(localStorage.getItem('notes'));
    } else {
      notes = [];
    }
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  saveNote(){
    const modalBody = document.querySelector('.modal-card-body');
    const inputTitle = modalBody.getElementsByTagName('input')[0];
    const inputBody = modalBody.getElementsByTagName('textarea')[0];

    // here we will create note object
    const noteObj = this.createNoteObject(inputTitle.value, inputBody.value);
    const note = this.createNoteElement(noteObj);

    // create note in localStorage
    this.saveNoteInBrowser(noteObj);

    // append note in notes-stack and clean input field
    document.querySelector('.notes-stack').appendChild(note);
    modalBody.parentElement.parentElement.classList.toggle('is-active');
    inputBody.value = '';
    inputTitle.value = '';
  }



}
