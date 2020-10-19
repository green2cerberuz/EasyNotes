export default class UI {
  static createNoteBody() {
    const html = document.createElement('div');
    html.classList.add('columns');
    html.innerHTML = `
      <div class="column is-12">
        <p class="note-date"></p>
        <p class="note-title"></p>
        <p class="note-brief subtitle"></p>
        <button class="button delete-note is-danger is-small" data-action="delete">Delete</button>
      </div>
    `;
    return html;
  }

  static openColorSelectorModal() {
    document.querySelector('#modal-change-color').classList.toggle('is-active');
  }

  static openNoteModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  static closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  static changeAppColor(event) {
    const color = getComputedStyle(event.target).backgroundColor;
    document.getElementsByTagName('html')[0].style.backgroundColor = color;

    // Save new settings in localStorage.
    const settings = JSON.parse(localStorage.getItem('settings'));
    settings.bgColor = color;
    localStorage.setItem('settings', JSON.stringify(settings));
    // Analyze a better user experience
    event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle('is-active');
  }
}
