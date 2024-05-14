import { useRef, useEffect } from 'react';

/*
  useRef Hook
  useRef is used to create any mutable value that persists across renders without causing the 
  component to re-render when the reference changes. It is suitable for managing mutable values or 
  DOM elements in a functional component.
*/

const CreateNote = ({ handleAddNote, noteToEdit, handleEditNote }) => {
  // useRef('') initializes the reference with an initial value of an empty string
  const noteTextRef = useRef(''); 

  useEffect(() => {
    if (noteToEdit) {
      noteTextRef.current.value = noteToEdit.text;
    } else {
      noteTextRef.current.value = '';
    }
  }, [noteToEdit]);

  const printNote = () => {
    const text = noteTextRef.current.value.trim();
    // noteTextRef.current is used to access the current value of the input element
    // .current refers to the current value of the noteTextRef
    //  valueOf accesses the value property of the input element

    if (text.length > 0) {
      if (noteToEdit) {
        handleEditNote(noteToEdit.id, text);
      } else {
        handleAddNote(text);
      }
      noteTextRef.current.value = '';
    }
  };

  return (
    <header>
      <h1>To Do App</h1>
      <div className='create-note'>
        <input 
          type='text' 
          ref={noteTextRef} 
          // 'ref={noteTextRef}' creates a reference to the input element allowing to directly access the input element without having to query the DOM.
          className='new-note' 
          placeholder='I will help u remember this'
        />
        <input 
          type='button' 
          className='add-note' 
          value={noteToEdit ? 'Update' : 'Add Task'}
          onClick={printNote}
        />
      </div>
    </header>
  );
}

export default CreateNote;
