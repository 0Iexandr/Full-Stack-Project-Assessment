import React from 'react';
import Button from 'react-bootstrap/Button';
import AddVideoModal from '../Modal/Modal';
import './AddVideoButton.css';

function AddVideoButton({addVideo}) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='add-video-btn' type='button' onClick={() => setModalShow(true)}>
        Add new video
      </Button>
      <AddVideoModal
        addVideo={addVideo}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AddVideoButton;