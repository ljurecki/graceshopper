import React, { useState } from 'react';
import { registerForm } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';


const RegisterForm = ({ navigate, setJwt }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async () => {
        const result = await register(username, password);
        if (!result.error) {
            if (result.token) {
                setJwt(result.token);
                window.localStorage.setItem('jwt', result.token);
                navigate('/');
            } else {
                console.error('No token returned from server');
            }
        } else {
            console.error(result.error);
            setErrorMessage(result.error);
        }
    };

    return (
        <Form
          onSubmit={e => {
            e.preventDefault();
            registerUser();
          }}>
          <Form.Group className='mb-3' style={{ margin: '3% 25% 0px 25%' }}>
            <Form.Control
              placeholder='Username'
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
    
          <Form.Group className='mb-3' style={{ margin: '2% 25% 0px 25%' }}>
            <Form.Control
              type='password'
              placeholder='Password'
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
              variant='primary'
              className='mx-2 justify-self-end'
              onClick={() => navigate('/register')}>
              Register
            </Button>
            {errorMessage && (
              <Alert variant='danger' className='mt-3'>
                {errorMessage}
              </Alert>
            )}
          </Form.Group>
        </Form>
      );
    };
    
    export default RegisterForm;   







//     const handleRegisterClick = async (event) => {
//         event.preventDefault();
//         const registerInfo = {
//             user: user,
//             password: password
//         };

//         let firstPassword = document.querySelector('.password').value,
//             confirmPassword = document.querySelector('.confirm_password').value;

//         if (firstPassword == "") {
//             alert("Password field cannot be empty");
//             return false;
//         }

//         if (firstPassword != confirmPassword) {
//             alert("Passwords did not match, please try again!");
//             return false
//         }

//         const newUser = await registerUser(registerInfo);
//         alert(newUser.message)

//         setUser("");
//         setPassword("");
//         document.querySelector('.confirm_password').value = '';
//         window.location.reload(false);
//     };

//     const handleUserChange = (event) => {
//         setUser(event.target.value);
//     }
//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     }


//     return (
//         <div id='registerPage'>
//             <h1>REGISTER NEW USER</h1>
//             <form>
//                 <label for="username">Username: </label>
//                 <input type="text" id="username" placeholder="Username" value={user} onChange={handleUserChange} />
//                 <br />
//                 <label for="password">Password: </label>
//                 <input type="password" className="password" placeholder="Password" id="password" value={password}
//                     onChange={handlePasswordChange} />
//                 <br />
//                 <label for="confirm-password">Confirm Password: </label>
//                 <input type="password" className="confirm_password" placeholder="Re-Enter Password" id="confirm-password"
//                 />
//                 <br />
//                 <br />
//                 <button onClick={handleRegisterClick}>Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterUser;