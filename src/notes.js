import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

//Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes')
  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

//save notes to local storage
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

//expose notes from module
const getNotes = () => notes

const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf()
  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  })
  saveNotes()
}

const deleteNote = (id) => {
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes()
  }
}

notes = loadNotes()

export { getNotes, createNote, deleteNote }