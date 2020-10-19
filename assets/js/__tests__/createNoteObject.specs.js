import App from '../app.js';

const app = new App();

// import { _createNoteObject, openColorSelectorModal, openModal } from "../functions";

describe('Create note object function', () => {
  // test stuff
  test('it should create a note object', () => {
    const input = {
      title: 'La primera nota de prueba',
      body: 'La primera nota de prueba',
    };

    const output = {
      title: 'La primera nota de prueba',
      body: 'La primera nota de prueba',
      position: 1,
      createdAt: new Date().toDateString(),
      brief: String(input.body).substring(0, input.body.length / 2),
    };
    expect(App.createNoteObject(input.title, input.body)).toEqual(output);
  });
  test('testing logic to open color selector modal', () => {
    document.body.innerHTML = `
    <button id="change-color" class="button is-link">CC</button>
    <div class="modal" id="modal-change-color"></div>
    `;
    // setup button element to open it
    const button = document.getElementById('change-color');
    button.addEventListener('click', app.ui.openColorSelectorModal);
    button.click();

    // test behavior
    const modal = document.getElementById('modal-change-color');
    expect(modal.classList.contains('is-active')).toEqual(true);
  });

  test('testing opening main modal', () => {
    document.body.innerHTML = `
    <button class="add-note button is-link">CC</button>
    <div class="modal"></div>
    `;
    const button = document.querySelector('.add-note');
    button.addEventListener('click', app.ui.openNoteModal);
    button.click();
    const modal = document.querySelector('.modal');
    expect(modal.classList.contains('is-active')).toEqual(true);
  });
});
