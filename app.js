let notes = getSavedNotes();

const filters = {
  searchText: ''
}

showNotes(notes, filters);

const createNote = document.getElementById('createNote');
createNote.addEventListener('click', function(e) {
  const id = uuidv4();
  notes.push({
    id: id,
    title: '',
    body: ''
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  location.assign(`/note.html#${id}`);
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  showNotes(notes, filters);
});

const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', function(e) {

});

window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    showNotes(notes, filters);
  }
})