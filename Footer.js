import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            &copy; BookStore - 
            <a href="https://bookshop.org/info/about-us">About Us</a> | 
            <a href="https://www.boookart.com/pages/contact">Contact</a> | 
            Address | 
            <a href="https://instagram.com/onlinebookstoreofficial?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a> | 
            <a href="https://m.facebook.com/OnlineBookStoreOfficial" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a> | 
            <a href="https://twitter.com/oxfordbookstore?lang=en" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
