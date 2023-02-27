import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import Spinner from './Spinner';
import { getProduct, getSizes } from '../services/api';

const ProductPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ids = pathname.split('/').map((id) => Number(id));
  const [ , selectedProductId, selectedColorId ] = ids;
  const [product, setProduct] = useState(null);
  const [currentColor, setCurrentColor] = useState({});
  const [currentImage, setCurrentImage] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const [loading, setLoading] = useState('pending');
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      getProduct(selectedProductId)
        .then((data) => {
          setProduct(data);
          const color = data.colors.find((c) => c.id === selectedColorId);
          setCurrentColor(color);
          setCurrentImage(color.images[0]);
          setLoading('success');
        })
        .catch((err) => {
          console.error(err);
          if (err.message === 'Product not found') {
            setLoading('notFoundError');
          } else {
            setLoading('unknownError');
          }
        });
    };
    const fetchSizes = () => getSizes()
      .then((data) => setSizes(data));

    fetchProduct();
    fetchSizes();
  }, [selectedProductId, selectedColorId]);

  const handleClick = (color) => {
    setCurrentColor(color);
    setCurrentImage(color.images[0]);
    setCurrentSize('');
  };

  const renderContent = () => (
    <Row xs={1} sm={2} className='mt-3'>
      <Col>
        <h1>{product.name}</h1>

        <div className='mt-3'>Выбрать цвет:</div>
        {product.colors.map((color) => (
          <Button
            key={color.id}
            className='m-2 ms-0'
            onClick={() => handleClick(color)}
            active={color.id === currentColor.id}
          >
            {color.name}
          </Button>
        ))}

        <div className='mt-3'>Выбрать размер:</div>
        {sizes.map((s) => (
          <Button
            key={s.id}
            className='m-2 ms-0'
            onClick={() => setCurrentSize(s)}
            active={s === currentSize}
            disabled={!currentColor.sizes.includes(s.id)}
          >
            {s.label} / {s.number}
          </Button>
        ))}
        {currentColor.sizes.length ? null : (<Alert variant='danger' className='w-50'>Нет в продаже</Alert>)}
      </Col>

      <Col>
        <div>Цена: {currentColor.price} &#8381;</div>
        <div>Цвет: {currentColor.name}</div>
        <div>Размер: {currentSize ? `${currentSize.label} / ${currentSize.number}` : 'не выбран'}</div>
        <div>Описание: {currentColor.description}</div>
        <div>Изображения:</div>
        {currentColor.images.map((img, i) => (
          <Button
            key={img}
            className='m-2 ms-0'
            onClick={() => setCurrentImage(img)}
            active={img === currentImage}
          >
            {i + 1}
          </Button>
        ))}
        <img className='d-block w-50' src={currentImage} alt={`${product.name} ${currentColor.name}`} />
      </Col>
    </Row>
  );

  const renderMainContent = () => {
    switch(loading) {
      case 'pending':
        return (<Spinner />);
      case 'success':
        return renderContent();
      case 'notFoundError':
        return (<Alert variant='danger' className='w-50 mt-3'>Товар не найден</Alert>);
      case 'unknownError':
        return (<Alert variant='danger' className='w-50 mt-3'>Произошла неизвестная ошибка. Попробуйте открыть страницу позже</Alert>);
      default:
        throw new Error(`Unknown stage of loading: ${loading}`);
    }
  };

  return (
    <Container className='my-3'>
      <Button onClick={() => navigate('/')} variant='success'>Вернуться в каталог</Button>
      {renderMainContent()}
    </Container>
  );
};

export default ProductPage;
