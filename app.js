const notes = [
  {
    title: 'app to build',
    body: 'Calorie counter. Thinking of using node.js'
  },
  {
    title: 'Work on Pictures and paintings',
    body: 'add pagination'
  },
  {
    title: 'Have to read more',
    body: 'Need to get into the habit to read more. At least a chapter a day'
  },
];

const filters = {
  searchText: ''
}

const showNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })

  document.getElementById('noteContainer').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const p = document.createElement('p');
    p.textContent = note.title;
    const noteContainer = document.getElementById('noteContainer');
    noteContainer.appendChild(p);
  })
}

showNotes(notes, filters);

const createNote = document.getElementById('createNote');
const removeAll = document.getElementById('removeAll');

createNote.addEventListener('click', function(e) {
  e.target.textContent = 'Clicked';
});

removeAll.addEventListener('click', function() {
  const notes = document.querySelectorAll('.note'); 
  notes.forEach(function(note) {
    note.remove();
  })
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  showNotes(notes, filters);
});