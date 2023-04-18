import React, { useState } from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { TUserCreate } from '../../../type/user.type';
import { useAppDispatch } from '../../../redux/hook';
import { createUser } from '../../../redux/slices/user.slice';

const SignupForm = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [key, setKey] = useState('');

    const clearProperties = () => {
        setName('');
        setPhone('');
        setPassword('');
        setRePassword('');
    };

    const handleSignIn = () => {
        const data: TUserCreate = {
            name: name,
            phone: phone,
            password: password,
            keyRestaurant: key,
        };

        dispatch(createUser(data))
            .then((_) => clearProperties())
            .catch((error) => console.log(error));
    };

    return (
        <form style={{ maxWidth: 600 }}>
            <MDBInput
                className="mb-4"
                id="form3Example1"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
                className="mb-4"
                type="tel"
                id="form1Example1"
                label="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {/* <MDBInput 
      className='mb-4' 
      id='form1Example1' 
      label='Restaurant key' 
      value={}
      /> */}
            <MDBInput
                className="mb-4"
                type="password"
                id="form3Example4"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
                className="mb-4"
                type="password"
                id="form3Example5"
                label="Confirm password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />

            <div onClick={handleSignIn}>Sign in</div>
        </form>
    );
};

export default SignupForm;
