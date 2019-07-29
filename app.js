'use strict'

let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited'
}

showNotes(notes, filters);

const createNote = document.getElementById('createNote');
createNote.addEventListener('click', (e) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  location.assign(`/note.html#${id}`);
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  showNotes(notes, filters);
});

const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  showNotes(notes, filters);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    showNotes(notes, filters);
  }
})