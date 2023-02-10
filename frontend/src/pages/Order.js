import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PetNavbar from '../components/PetNavbar';

export default function Order() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [animal, setAnimal] = useState('');
  useEffect(() => {
    async function fetchData() {
      const orderRes = await fetch(`http://localhost:1337/api/order/${id}`);
      const orders = await orderRes.json();
      setOrders(orders);
      const animalRes = await fetch(
        `http://localhost:1337/api/animal/${orders.order.idanimal}`
      );
      const animal = await animalRes.json();
      setAnimal(animal);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='container'>
      <PetNavbar />
      <Link to={`/`} className='btn btn-primary btn-lg my-2'>
        <i className='fas fa-home fa-2x'></i>{' '}
      </Link>
      <div className='jumbotron'>
        <h1 className='display-4'>Orders</h1>
        <hr className='my-4' />
        <p className='lead'>
          You Ordered A{' '}
          <span className='text-primary'>{animal && animal.name}</span>
        </p>
        <div className='img-container'>
          <img src={animal && animal.link} alt='' className='img-fluid mb-3' />
        </div>
        <p className='lead'>Price: <span className='text-danger'>{orders.order && orders.order.price}$</span></p>
      </div>
    </div>
  );
}
