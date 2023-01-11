import React from 'react';
import './DeleteButton.css';

function DeleteButton({deleteVideo}) {
  return (
    <button className='delete-button' type='button' onClick={deleteVideo}>Delete</button>
  );
}

export default DeleteButton