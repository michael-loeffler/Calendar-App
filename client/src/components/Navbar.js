import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar
        bg=''
        variant='muted'
        expand='lg'
        className='mb-3'
        style={{
          background: '#A8E5F9',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: 'black',
          borderBottom: '1px solid black'
        }}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {Auth.loggedIn() ? (
                <Nav.Link
                  onClick={Auth.logout}
                  className='rounded-full px-3 py-1 bg-gray-200 border-2 border-black hover:bg-gray-300 transition-all duration-300'
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  className='rounded-full px-3 py-1 bg-gray-200 border-2 border-black hover:bg-gray-300 transition-all duration-300'
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
      >
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

      <style jsx>{`
        @media (max-width: 1024px) {
          .navbar-nav {
            width: 100%;
            margin-top: 0.5rem;
            text-align: center;
            font-size: 20px
          }

          .navbar-nav .nav-link {
            border-radius: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AppNavbar;