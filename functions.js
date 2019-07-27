//Read existing notes from localStorage
const getSavedNotes = function() {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
}

const saveNotes = function(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

const deleteNote = function (id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
}

//Generate DOM structure for a note
const generateNote = function(note) {
  const noteContainer = document.createElement('div');
  const noteElem = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  noteContainer.appendChild(deleteButton);
  noteContainer.appendChild(noteElem);
  deleteButton.addEventListener('click', function() {
    deleteNote(note.id);
    saveNotes(notes)
    showNotes(notes, filters);
  });

    if (note.title.length > 0) {
      noteElem.textContent = note.title;
    } else {
      noteElem.textContent = 'Unnamed note';
    }
    return noteContainer;
}

//Render application notes
const showNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })

  document.getElementById('allNotesContainer').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteElement = generateNote(note);
    const allNotesContainer = document.getElementById('allNotesContainer');
    allNotesContainer.appendChild(noteElement);
  })
}