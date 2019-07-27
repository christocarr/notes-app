const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const removeNote = document.getElementById('removeNote');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function(note) {
  return note.id === noteId;
});

if(note === undefined) {
  location.assign('/index.html');
}
noteTitle.value = note.title;
noteBody.textContent = note.body;

//save note title and body when edited
noteTitle.addEventListener('keyup', function(e) {
  note.title = e.target.value;
  saveNotes(notes);
});
noteBody.addEventListener('keyup', function(e) {
  note.body = e.target.value;
  saveNotes(notes);
});

removeNote.addEventListener('click', function() {
  deleteNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', function(e) {
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(function(note) {
      return note.id === noteId
    });
    
    if (note === undefined) {
      location.assign('/index.html');
    }

    noteTitle.value = note.title;
    noteBody.textContent = note.body;
  }
});