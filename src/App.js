import { useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';


const initialState = {
  notes: JSON.parse(localStorage.getItem('react-notes-app-data')) || [],
  noteToEdit: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: nanoid(),
            text: action.payload,
            date: new Date().toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            completed: false
          }
        ]
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload)
      };
    case 'COMPLETE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload ? { ...note, completed: !note.completed } : note
        )
      };
    case 'EDIT_NOTE':
      const editedNotes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            text: action.payload.text,
            date: new Date().toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            completed: action.payload.completed
          };
        }
        return note;
      });
      return {
        ...state,
        notes: editedNotes,
        noteToEdit: null
      };
    case 'SET_NOTE_TO_EDIT':
      return {
        ...state,
        noteToEdit: action.payload
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(state.notes));
  }, [state.notes]);

  const { notes, noteToEdit } = state;

  return (
    <>
      <main>
        <div className='container'>
          <CreateNote
            handleAddNote={(text) => dispatch({ type: 'ADD_NOTE', payload: text })}
            noteToEdit={noteToEdit}
            handleEditNote={(id, newText) =>
              dispatch({ type: 'EDIT_NOTE', payload: { id, text: newText, completed: noteToEdit ? noteToEdit.completed : false } })
            }
          />
          <NotesList
            notes={notes}
            handleDeleteNote={(id) => dispatch({ type: 'DELETE_NOTE', payload: id })}
            handleCompleteNote={(id) => dispatch({ type: 'COMPLETE_NOTE', payload: id })}
            setNoteToEdit={(note) => dispatch({ type: 'SET_NOTE_TO_EDIT', payload: note })}
            handleEditNote={(id, text) => dispatch({ type: 'SET_NOTE_TO_EDIT', payload: { id, text } })}
          />
        </div>
      </main>
    </>
  );
}

export default App;