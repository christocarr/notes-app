const notes = getSavedNotes();

const filters = {
  searchText: ''
}

showNotes(notes, filters);

const createNote = document.getElementById('createNote');
createNote.addEventListener('click', function(e) {
  notes.push({
    id: uuidv4(),
    title: '',
    body: ''
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes(notes, filters);
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  showNotes(notes, filters);
});

const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', function(e) {

});