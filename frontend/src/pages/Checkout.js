import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import PetNavbar from '../components/PetNavbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Checkout() {
  const history = useHistory();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:1337/api/animal/${id}`)
      .then(res => res.json())
      .then(res => {
        setForm(res.formFields);
      })
      .then(() => setLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = e => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:1337/api/order/add/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...data, idanimal: id }),
    }).then(res => {

      setAlert(true);
    });
    history.push("/");
  };

  if (loading) {
    return <div>loading ...</div>;
  }

  const getRange = () => {
    const ages = [];
    for (var i = 1; i <= form[0].range; i++) {
      ages.push(<option key={i}>{i}</option>);
    }

    return ages;
  };

  return (
    <div className='container'>
      <PetNavbar />
      <Link to={`/`} className='btn btn-primary btn-lg mr-2'>
      <i class="fas fa-home fa-2x"></i>{' '}
      </Link>
      <Link to={`/animal/${id}`} className='btn btn-primary btn-lg'>
      <i class="fas fa-arrow-left fa-2x"></i>{' '}
      </Link>
      {alert && (
        <div className='alert alert-success my-2' role='alert'>
          Order is added successfully!
        </div>
      )}
      <Form onSubmit={onSubmit}>
        {form &&
          form.map((field, key) => {
            if (field.type === 'text') {
              return (
                <>
                  <Form.Group controlId='' key={key}>
                    <Form.Label>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{' '}
                      :
                    </Form.Label>
                    <Form.Control
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={onChange}
                    />
                  </Form.Group>
                </>
              );
            } else if (field.type === 'textarea') {
              return (
                <>
                  <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Label>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{' '}
                      :
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='3'
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={onChange}
                    />
                  </Form.Group>
                </>
              );
            } else if (field.type === 'select') {
              return (
                <>
                  <Form.Group controlId='exampleForm.ControlSelect1'>
                    <Form.Label>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{' '}
                      :
                    </Form.Label>
                    <Form.Control
                      as='select'
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={onChange}
                    >
                      {getRange()}
                    </Form.Control>
                  </Form.Group>
                </>
              );
            } else {
              return <></>;
            }
          })}
        <Button variant='primary' type='submit'>
          Buy
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;
