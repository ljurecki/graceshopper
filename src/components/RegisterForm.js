import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const registerUser = async () => {
    const results = await register(username, password);
    if (!results.error) {
      setSuccessMessage('Welcome to Best Books!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      console.error(results.error);
      setErrorMessage(results.error);
    }
  };

  return (
    <Form
      id='forms'
      onSubmit={event => {
        event.preventDefault();
        registerUser();
      }}>
      <Form.Group className='mb-3' style={{ margin: '3% 25% 0px 25%' }}>
        <Form.Control
          placeholder='Create username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3' style={{ margin: '2% 25% 0px 25%' }}>
        <Form.Control
          type='password'
          placeholder='Create Password'
          minLength={8}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group style={{ margin: '2% 25% 0px 25%' }}>
        <Button
          variant='success'
          type='submit'
          className='mx-2 justify-self-end'>
          Submit
        </Button>
        <Button
          variant='secondary'
          className='mx-2 justify-self-end'
          onClick={() => navigate('/login')}>
          Cancel
        </Button>
        {errorMessage && (
          <Alert variant='danger' className='mt-3'>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant='success' className='mt-3'>
            {successMessage}
          </Alert>
        )}
      </Form.Group>
    </Form>
  );
};

export default RegisterForm;


// import React, {useState} from 'react';
// import { Navigate } from 'react-router-dom';
// import { register } from '../api';
// import { Form, Button, Alert } from 'react-bootstrap';
// // import swal from 'sweetalert';

// const Register = ({ setToken, navigate }) => {
//     //props.setToken
//     // const {setToken} = props
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [confirmPassword, setConfirmPassword] = useState('');

// let loginForm = document.getElementById('registerForm')
// let errorMessage = document.getElementById('errorMessage')

// const handleSubmit = async() => {
//     const results = await register(username, password);

//     if (password !== confirmPassword) {
//         alert('Passwords do not match! Try again!', '', "error")
//         return null;
//     }

//     if (results.token) {
//         setToken(results.token)
//         alert('Your account has been successfully created!', 'Username: ' + username, "success")
//         console.log(results.message);
//         window.localStorage.setItem('token', results.token);
//         navigate('/home');
//     } else {
//         console.log(results.error)
//         loginForm.style.animation = 'shake .5s'
//         document.getElementsByName('username')[0].value = ''
//         document.getElementsByName('password')[0].value = ''
//         document.getElementsByName('confirmPassword')[0].value = ''
//         alert('There was an error creating your account:', results.error, "error")
//         errorMessage.innerText = results.error
//     }
// }

//     return (
//         <div className='loginForm' id='loginForm'>
//             <form className='registerForm' onSubmit={(event) => {
//                 event.preventDefault();
//                 handleSubmit();
//             }
//             }>
//                 <div className='inputDiv'>
//                     <label className='inputLabel'>Create Username</label>
//                     <input
//                         className='userorpass'
//                         name='username'
//                         type='text'
//                         autoFocus
//                         onChange={(event) => setUsername(event.target.value)}
//                     />
//                 </div>
//                 <div className='inputDiv'>
//                     <label className='inputLabel'>Create Password</label>
//                     <input
//                         className='userorpass'
//                         name='password'
//                         type='password'
//                         onChange={(event) => setPassword(event.target.value)}
//                     />
//                 </div>
//                 <div className='inputDiv'>
//                     <label className='inputLabel'>Confirm Password</label>
//                     <input
//                         className='userorpass'
//                         name='confirmPassword'
//                         type='password'
//                         onChange={(event) => setConfirmPassword(event.target.value)}
//                     />
//                 </div>
//                 <button className='submit' type='submit'>Register</button>
//                 <p id='errorMessage'></p>
//             </form>
//         </div>
//     )
// }

// export default Register;
