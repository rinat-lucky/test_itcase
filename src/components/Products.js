import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Tab, Tabs } from 'react-bootstrap';
import { getProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState('');

  useEffect(() => {
    const fetchData = () => getProducts().then((data) => setProducts(data));
    fetchData();
  }, []);

  return (
    <Container>
      <Tabs
        id='tabs'
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className='my-3 border'
        variant='pills'
        justify
      >
        {products.map((p) => (
          <Tab eventKey={p.name} title={p.name} key={p.id} className='d-flex flex-row justify-content-between'>
            {p.colors.map((color) => (
              <Card style={{ width: '22rem' }}>
                <Card.Img variant="top" src={color.images[0]} />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{`Цвет: ${color.name}`}</Card.Text>
                  <Button>Подробнее</Button>
                </Card.Body>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
      {key ? null : (<Alert variant='success' className='text-center'>Выберите категорию товаров</Alert>)}

    </Container>
  );
};

export default Products;
