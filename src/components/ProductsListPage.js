import { useCallback, useEffect, useState } from 'react';
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

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState(null);

  const setActiveKey = useCallback((key) => setKey(key), [])

  useEffect(() => {
    const fetchProductsList = async () => {
      const data = await getProducts()
      setProducts(data)
    };

    fetchProductsList();
  }, []);

  return (
    <Container>
      <Tabs
        activeKey={key}
        onSelect={setActiveKey}
        className='my-3'
        variant='pills fw-bold'
      >
        {products.map((product) => (
          <Tab
            eventKey={product.name}
            title={product.name}
            key={product.id}
          >
            <Row xs={2} md={3} lg={4} xl={5} className='g-3'>
              {product.colors.map((color) => (
                <Col key={color.id}>
                  <Card>
                    <Card.Img variant='top' src={color.images[0]} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{`Цвет: ${color.name}`}</Card.Text>
                      <div className='d-grid gap-2'>
                        <Button>
                          <Link to={`/${product.id}/${color.id}`} className='text-decoration-none text-light'>Подробнее</Link>
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

      {Boolean(!key) && (<Alert variant='success' className='w-50'>Выберите категорию товаров</Alert>)}
    </Container>
  );
};

export default ProductsListPage;
