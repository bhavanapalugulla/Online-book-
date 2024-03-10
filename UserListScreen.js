import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import './usersbg.css';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="user-screen">
      <>
        <h1 style={{ fontWeight: 'bold', color: 'white' }}>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold', color: 'white' }}>ID</th>
                <th style={{ fontWeight: 'bold', color: 'white' }}>NAME</th>
                <th style={{ fontWeight: 'bold', color: 'white' }}>EMAIL</th>
                <th style={{ fontWeight: 'bold', color: 'white' }}>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ fontWeight: 'bold', color: 'white' }}>{user._id}</td>
                  <td style={{ fontWeight: 'bold', color: 'white' }}>{user.name}</td>
                  <td style={{ color: 'white' }}>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td style={{ color: 'white' }}>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    </div>
  );
};

export default UserListScreen;
