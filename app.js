let notes = [];

const filters = {
  searchText: ''
}

//Check for exsiting saved data
const notesJSON = localStorage.getItem('notes');

if (notesJSON !== null) {
  notes = JSON.parse(notesJSON);
}

const showNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })

  document.getElementById('noteContainer').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const p = document.createElement('p');

    if (note.title.length > 0) {
      p.textContent = note.title;
    } else {
      p.textContent = 'Unnamed note';
    }

    const noteContainer = document.getElementById('noteContainer');
    noteContainer.appendChild(p);
  })
}

showNotes(notes, filters);

const createNote = document.getElementById('createNote');
createNote.addEventListener('click', function(e) {
  notes.push({
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
  console.log(e.target.value);
});