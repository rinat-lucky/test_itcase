import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { getProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState(null);

  useEffect(() => {
    const fetchData = () => getProducts()
      .then((data) => setProducts(data));

    fetchData();
  }, []);

  return (
    <Container>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className='my-3'
        variant='pills fw-bold'
      >
        {products.map((p) => (
          <Tab
            eventKey={p.name}
            title={p.name}
            key={p.id}
          >
            <Row xs={2} md={3} lg={4} xl={5} className='g-3'>
              {p.colors.map((color) => (
                <Col key={color.id}>
                  <Card>
                    <Card.Img variant='top' src={color.images[0]} />
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>{`Цвет: ${color.name}`}</Card.Text>
                      <div className='d-grid gap-2'>
                        <Button>
                          <Link to={`/${p.id}/${color.id}`} className='text-decoration-none text-light'>Подробнее</Link>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>
      {key ? null : (<Alert variant='success' className='w-50'>Выберите категорию товаров</Alert>)}
    </Container>
  );
};

export default Products;
