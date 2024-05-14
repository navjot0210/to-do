import Note from './Note';

/*
  Prop Drilling
  It is a pattern of passing props down through multiple levels of components.

  For example,  the 'NotesList' component passes down various props to each 'Note' component, 
  such as id, text, date, setNoteToEdit, handleEditNote, handleCompleteNote, handleDeleteNote, 
  and completed; which are passed down from a higher-level component.
*/

const NotesList = ({ notes, handleDeleteNote, handleCompleteNote, setNoteToEdit, handleEditNote }) => {

  return (
    <>
      <div className='notes-list'>
        {notes.map((note) => (
          <Note 
            key={note.id} 
            id={note.id} 
            text={note.text} 
            date={note.date}
            setNoteToEdit={setNoteToEdit}  
            handleEditNote={handleEditNote}
            handleCompleteNote={handleCompleteNote} 
            handleDeleteNote={handleDeleteNote}
            completed={note.completed}
          />
        ))}
      </div>
    </>
  );
}

export default NotesList;