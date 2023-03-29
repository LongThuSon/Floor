import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const SignupForm = () => {
  return (
    <form style={{ maxWidth: 600 }}>
      <MDBInput className='mb-4' id='form3Example1' label='Name' />
      <MDBInput className='mb-4' type='tel' id='form1Example1' label='phone number' />
      <MDBInput className='mb-4' id='form1Example1' label='Restaurant key' />
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />
      <MDBInput className='mb-4' type='password' id='form3Example5' label='Confirm password' />

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>
    </form>
  );
};

export default SignupForm;