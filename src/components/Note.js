import { FaTrashAlt, FaEdit, FaCheckCircle } from 'react-icons/fa';

const Note = ({ id, text, date, handleDeleteNote, handleCompleteNote, setNoteToEdit, handleEditNote, completed }) => {
  const handleEditClick = () => {
    handleEditNote(id, text);
    setNoteToEdit({ id, text });
  };

  return (
    <div className={`note flex ${completed ? 'completed' : ''}`}>
      <p>{text}</p>
      <div className='note-footer flex'>
        <span>{date}</span>
        <div className='icons flex'>
          <FaCheckCircle 
            className='complete-icon' 
            onClick={() => handleCompleteNote(id)} 
          />
          <FaEdit 
            className='edit-icon' 
            onClick={handleEditClick} 
          />
          <FaTrashAlt 
            className='delete-icon' 
            onClick={() => handleDeleteNote(id)} 
          />
        </div>
      </div>
    </div>
  );
}

export default Note;
