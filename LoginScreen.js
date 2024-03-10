import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import './LoginScreen.css';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const loginScreenStyles = {
    backgroundImage: "./Library_pic1.jpg",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  

  return (
   
    <div className="login-screen"> {/* Use the class name 'login-screen' */}
      <FormContainer>
        <div className="login-container"> 
          <h1 className="login-title"> Online Book Store </h1> 
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className="login-form"> {/* Use the class name 'login-form' */}
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
  
            <Button type='submit' variant='primary' className="sign-in-button">Sign In</Button> {/* Use the class name 'sign-in-button' */}
          </Form>
  
          <Row className='py-3'>
            <Col>
              New User?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="register-link">Register</Link> {/* Use the class name 'register-link' */}
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  )
  
}

export default LoginScreen
