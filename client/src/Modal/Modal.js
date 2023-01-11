import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CForm, CCol, CFormInput, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import './Modal.css';

function AddVideoModal(props) {
  const {addVideo, ...rest} = props;
  const [videoData, setVideoData] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setVideoData(prevState => ({...prevState, [name]: name === 'url' ? value.slice(0, 43) : value}));
  };

  const validateForm = () => {
    const title = document.forms['adding'].elements[1];
    const url = document.forms['adding'].elements[2];
    if (!title.value || !url.value) {
      return false;
    } else if (!url.value.includes('www.youtube.com/watch?')) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    const inputsValidation = validateForm();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidated(true);
    if (inputsValidation === true) {
      addVideo(videoData);
      props.onHide();
    }
  };

  return (
    <Modal
      {...rest}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <CForm
          name='adding'
          className='column g-3 needs-validation'
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            ADD YOUR VIDEO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CCol lg>
            <CFormInput
              onChange={handleChange}
              name='title'
              type='text'
              placeholder='Title'
              feedbackValid='Looks good!'
              feedbackInvalid='Please provide a title.'
              id='validationCustom01'
              label='Title'
              size='lg'
              required
            />
          </CCol>
          <CCol lg>
            <CFormInput
              onChange={handleChange}
              name='url'
              type='url'
              placeholder='URL'
              feedbackValid='Looks good!'
              feedbackInvalid='Please provide a valid URL.'
              id='validationCustom02'
              label='URL'
              size='lg'
              required
            />
          </CCol>
        </Modal.Body>
        <Modal.Footer>
            <CButton className='add-video-modal-btn' onClick={handleSubmit} type='button'>
              Add video
            </CButton>
          <Button className='close-video-modal-btn' type='button' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </CForm>
    </Modal>
  );
}

export default AddVideoModal;