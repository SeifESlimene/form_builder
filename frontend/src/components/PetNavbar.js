import React from 'react';
import ModalOrder from './ModalOrder.js';
import Navbar from 'react-bootstrap/Navbar'

export default function PetNavbar() {
  return (
    <Navbar bg='dark' variant='dark' className="mb-5 justify-content-between fix">
      <Navbar.Brand href='/'><i className="fas fa-paw fa-2x"></i> Pet Shop</Navbar.Brand>
      <ModalOrder />
    </Navbar>
  );
}
