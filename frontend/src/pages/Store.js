import React, { useState, useEffect } from 'react';
import PetNavbar from '../components/PetNavbar';
import { Link } from 'react-router-dom';

function Store(props) {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:1337/api/`)
      .then(res => res.json())
      .then(res => setAnimals(res))
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div className='container'>
        <PetNavbar />
        <div className='row'>
          {animals.map((animal, key) => (
            <div key={key} className='col-lg-3'>
              <div className='card'>
                <div className='card-header text-center'>{animal.name}</div>
                <div className='card-body'>
                  <img
                    src={animal.link}
                    alt=''
                    className='img-thumbnail img-fluid image-anim'
                  />
                </div>
                <div className='card-footer text-center'>
                  <Link
                    to={`/animal/${animal._id}`}
                    className='btn btn-primary'
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
