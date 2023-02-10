import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PetNavbar from '../components/PetNavbar';

function Details() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchAnimal() {
      fetch(`http://localhost:1337/api/animal/${id}`)
        .then(res => res.json())
        .then(animal => setAnimal(animal))
        .then(() => setLoading(false));
    }
    fetchAnimal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>loading ...</div>;
  }

  return (
    <div className='container'>
      <PetNavbar />
      <Link to={`/`} className='btn btn-primary btn-lg my-2'>
        <i class='fas fa-home fa-2x'></i>{' '}
      </Link>
      <div className='jumbotron'>
        <h1 className='display-4'>{`${animal.name}`}</h1>
        <p className='lead'>{`${animal.lead}`}</p>
        <hr className='my-4' />
        <p>{`${animal.description}`}</p>
        <div class='img-container'>
          <img src={`${animal.link}`} alt='' className='img-fluid mb-3' />
        </div>
        <p className='lead'>
          <Link
            to={`/checkout/${animal._id}`}
            className='btn btn-primary btn-lg'
          >
            Checkout
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Details;
