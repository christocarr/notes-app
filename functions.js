//Read existing notes from localStorage
const getSavedNotes = function() {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
}

//Generate DOM structure for a note
const generateNote = function(note) {
  const noteContainer = document.createElement('div');
  const noteElem = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
    if (note.title.length > 0) {
      noteElem.textContent = note.title;
      noteContainer.appendChild(deleteButton);
      noteContainer.appendChild(pElement);
    } else {
      noteElem.textContent = 'Unnamed note';
      noteContainer.appendChild(deleteButton);
      noteContainer.appendChild(noteElem);
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