import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

const BookingForm = () => {
  return (
    <form style={{ maxWidth: 600 }}>
      <MDBInput wrapperClass='mb-4' id='form6Example3' label='Name' />
      <MDBInput className='mb-4' type='tel' id='form1Example1' label='phone number' />
      <MDBInput wrapperClass='mb-4' type='number' id='form6Example4' label='Quantity' />
      <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Email' />

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form6Example8'
        label='T agree to booking'
      />

      <MDBBtn className='mb-4' type='submit' block>
        Booking
      </MDBBtn>
    </form>
  );
};

export default BookingForm;