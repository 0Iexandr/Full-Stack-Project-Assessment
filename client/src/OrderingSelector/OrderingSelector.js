import React from 'react';
import Form from 'react-bootstrap/Form';
import './OrderingSelector.css';

function OrderingSelector({orderVideos}) {
  const handleChange = (event) => {
    orderVideos(event.target.value);
  };

  return (
    <div className='order'>
      <p>Sort by</p>
      <Form.Select aria-label='Default select example' onChange={handleChange}>
        <option value='descending'>descending</option>
        <option value='ascending'>ascending</option>
      </Form.Select>
    </div>
  )
}

export default OrderingSelector;