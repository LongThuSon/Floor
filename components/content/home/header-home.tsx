import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';

type IActionUser = {
    setBooking: () => void,
    setLogin: () => void,
    setSignup: () => void
};

const HeaderHome = ({ setBooking, setLogin, setSignup }: IActionUser) => {
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Tasty Go</MDBNavbarBrand>
      </MDBContainer>
      
      <MDBBtn outline color="secondary" className='me-2' type='button' onClick={setBooking}>
            Booking
        </MDBBtn>
        <MDBBtn outline color="secondary" className='me-2' type='button' onClick={setLogin}>
            Login
        </MDBBtn>
         <MDBBtn outline color="secondary" className='me-2' type='button' onClick={setSignup}>
            Signup
        </MDBBtn>
    </MDBNavbar>
  );
};

export default HeaderHome;