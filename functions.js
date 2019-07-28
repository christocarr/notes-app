//Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
}

const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

const deleteNote = (id) => {
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
}

//Generate DOM structure for a note
const generateNote = (note) => {
  const noteContainer = document.createElement('div');
  const noteElem = document.createElement('a');
  const deleteButton = document.createElement('button');

  //set up delete button
  deleteButton.textContent = 'x';
  noteContainer.appendChild(deleteButton);
  deleteButton.addEventListener('click', function() {
    deleteNote(note.id);
    saveNotes(notes)
    showNotes(notes, filters);
  });

  //set up note text
  noteElem.setAttribute('href', `/note.html#${note.id}`);
  noteContainer.appendChild(noteElem);

    if (note.title.length > 0) {
      noteElem.textContent = note.title;
    } else {
      noteElem.textContent = 'Unnamed note';
    }
    return noteContainer;
}

//display notes by one of three options
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1; 
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetically') {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

//Render application notes
const showNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })

  const allNotesContainer = document.getElementById('allNotesContainer');
  allNotesContainer.innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteElement = generateNote(note);
    allNotesContainer.appendChild(noteElement);
  })
}

//display time when last edited
const displayLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`;
}