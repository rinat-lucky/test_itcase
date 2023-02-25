import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { getProduct, getSizes } from '../services/api';

const ProductPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const productId = Number(pathname.split('/')[1]);
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = () => getProduct(productId)
      .then((data) => setProduct(data));
    const fetchSizes = () => getSizes()
      .then((data) => setSizes(data));

    fetchProduct();
    fetchSizes();
  }, []);


  return (
    <Container className='mt-3'>
      <Button onClick={() => navigate('/')}>На главную</Button>
      <h1>{product.name}</h1>
    </Container>
  );
};

export default ProductPage;
