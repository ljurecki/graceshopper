import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../api';
import swal from 'sweetalert';

const Register = ({ setToken, navigate }) => {
    //props.setToken
    // const {setToken} = props
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

let loginForm = document.getElementById('loginForm')
let errorMessage = document.getElementById('errorMessage')

const handleSubmit = async() => {
    const results = await registerUser(username, password);

    if (password !== confirmPassword) {
        swal('Passwords do not match! Try again!', '', "error")
        return null;
    }

    if (results.token) {
        setToken(results.token)
        swal('Your account has been successfully created!', 'Username: ' + username, "success")
        console.log(results.message);
        window.localStorage.setItem('token', results.token);
        navigate('/home');
    } else {
        console.log(results.error)
        loginForm.style.animation = 'shake .5s'
        document.getElementsByName('username')[0].value = ''
        document.getElementsByName('password')[0].value = ''
        document.getElementsByName('confirmPassword')[0].value = ''
        swal('There was an error creating your account:', results.error, "error")
        errorMessage.innerText = results.error
    }
}

    return (
        <div className='loginForm' id='loginForm'>
            <form className='registerForm' onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }
            }>
                <div className='inputDiv'>
                    <label className='inputLabel'>Create Username</label>
                    <input
                        className='userorpass'
                        name='username'
                        type='text'
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='inputDiv'>
                    <label className='inputLabel'>Create Password</label>
                    <input
                        className='userorpass'
                        name='password'
                        type='password'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='inputDiv'>
                    <label className='inputLabel'>Confirm Password</label>
                    <input
                        className='userorpass'
                        name='confirmPassword'
                        type='password'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button className='submit' type='submit'>Register</button>
                <p id='errorMessage'></p>
            </form>
        </div>
    )
}

export default Register;


