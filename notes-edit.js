const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const removeNote = document.getElementById('removeNote');
let timeLastEdited = document.getElementById('time');

let notes = getSavedNotes();

const noteId = location.hash.substring(1);
let note = notes.find(note => note.id === noteId);

if(note === undefined) {
  location.assign('/index.html');
}
noteTitle.value = note.title;
noteBody.textContent = note.body;
timeLastEdited.textContent = displayLastEdited(note.updatedAt);

//save note title and body when edited
noteTitle.addEventListener('keyup', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  saveNotes(notes);
  timeLastEdited.textContent = displayLastEdited(note.updatedAt);
});
noteBody.addEventListener('keyup', (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  timeLastEdited.textContent = displayLastEdited(note.updatedAt);
  saveNotes(notes);
});

removeNote.addEventListener('click', () => {
  deleteNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);
    
    if (note === undefined) {
      location.assign('/index.html');
    }

    noteTitle.value = note.title;
    noteBody.textContent = note.body;
    timeLastEdited.textContent = displayLastEdited(note.updatedAt);
  }
});