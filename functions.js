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
  const pElement = document.createElement('p');

    if (note.title.length > 0) {
      pElement.textContent = note.title;
    } else {
      pElement.textContent = 'Unnamed note';
    }
    return pElement;
}

//Render application notes
const showNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })

  document.getElementById('noteContainer').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteElement = generateNote(note);
    const noteContainer = document.getElementById('noteContainer');
    noteContainer.appendChild(noteElement);
  })
}