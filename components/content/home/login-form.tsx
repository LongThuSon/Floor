import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

const LoginForm = () => {
  return (
    <form style={{ maxWidth: 600 }}>
      <MDBInput className='mb-4' type='tel' id='form1Example1' label='phone number' />
      <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href='#!'>Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' block>
        Log in
      </MDBBtn>
    </form>
  );
};

export default LoginForm;