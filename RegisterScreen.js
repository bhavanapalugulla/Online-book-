import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import './RegisterScreen.css'; // Import the CSS file here

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  }

  return (
    <div className="register-screen"> {/* Use the class name 'register-screen' */}
      <FormContainer>
        <div className="register-container"> {/* Use the class name 'register-container' */}
          <h1 className="register-title">Sign Up</h1> {/* Use the class name 'register-title' */}
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className="register-form"> {/* Use the class name 'register-form' */}
            <Form.Group controlId='name' className="form-group"> {/* Use the class name 'form-group' */}
              <Form.Label className="form-label">Name</Form.Label> {/* Use the class name 'form-label' */}
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className="form-group"> {/* Use the class name 'form-group' */}
              <Form.Label className="form-label">Email Address</Form.Label> {/* Use the class name 'form-label' */}
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="form-group"> {/* Use the class name 'form-group' */}
              <Form.Label className="form-label">Password</Form.Label> {/* Use the class name 'form-label' */}
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className="form-group"> {/* Use the class name 'form-group' */}
              <Form.Label className="form-label">Confirm Password</Form.Label> {/* Use the class name 'form-label' */}
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
               
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="register-button">Register</Button> {/* Use the class name 'register-button' */}
          </Form>

          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="login-link">Login</Link> {/* Use the class name 'login-link' */}
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
