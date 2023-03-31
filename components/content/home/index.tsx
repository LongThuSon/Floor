import { useState } from 'react';
import Image from 'next/image';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

import { ActionUser } from '../../../public/data-constant';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import ReservationImg from '../../../public/Image/reservation.png';
import HeaderHome from './header-home';
import BookingForm from './booking-form';

const Home = () => {
    const [actionUser, setActionUser] = useState(ActionUser.Booking);

    return (
        <div>
            {/* header */}
            <HeaderHome
                setBooking={() => setActionUser(ActionUser.Booking)}
                setLogin={() => setActionUser(ActionUser.Login)}
                setSignup={() => setActionUser(ActionUser.Signup)}
            />

            <MDBRow className="mb-4 mt-4 mx-auto">
                {/* image */}
                <MDBCol>
                    <Image
                        src={ReservationImg}
                        className="img-fluid shadow-4"
                        alt="Reservation"
                    />
                </MDBCol>

                {/* form */}
                <MDBCol>
                    {actionUser === ActionUser.Booking ? (
                        <BookingForm />
                    ) : actionUser === ActionUser.Login ? (
                        <LoginForm />
                    ) : (
                        <SignupForm />
                    )}
                </MDBCol>
            </MDBRow>
        </div>
    );
};
export default Home;
