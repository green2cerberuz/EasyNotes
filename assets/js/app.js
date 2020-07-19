console.clear();
console.log("First Test");

// Add basic open modal functionality
function openModal(event){
  console.log('Enter the button');
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

// Close modal functionality, improve just for testing html modal code
function closeModal(event){
  let modal = document.querySelector('.modal');
  modal.classList.toggle('is-active');
}

let addNote = document.querySelector('.add-note');
addNote.addEventListener('click', openModal);

let closeNote = document.querySelector('.delete');
closeNote.addEventListener('click', closeModal);
