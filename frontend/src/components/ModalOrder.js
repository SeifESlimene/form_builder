import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import { Link } from 'react-router-dom';

function ModalOrder() {
  const [lgShow, setLgShow] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/orders`)
      .then(res => res.json())
      .then(res => {
        setOrders(res);
      });
  }, []);

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => setLgShow(true)}
      >
        <i className='fas fa-shopping-cart fa-2x'></i>{' '}
        <span className='badge badge-danger'>{orders.length}</span>
      </button>

      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.map((order, key) => {
            return (
              <ListGroup className='mb-2' key={key}>
                <ListGroup.Item>{`Order Created ${moment(
                  order.createdAt
                ).fromNow()}`}</ListGroup.Item>
                <ListGroup.Item>
                  <Link
                    to={`/order/${order._id}`}
                    onClick={() => setLgShow(false)}
                  >
                    See Order
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalOrder;
