import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Row,
  Stack,
} from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import Spinner from './Spinner';
import { getProduct, getSizes } from '../services/api';
import store from "../store/CartStore";

const ProductPage = observer(() => {
  const { pathname } = useLocation();
  const ids = pathname.split('/').map((id) => Number(id));
  const [ , selectedProductId, selectedColorId ] = ids;
  const [product, setProduct] = useState({});
  const [currentColor, setCurrentColor] = useState({});
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('pending');
  const [sizes, setSizes] = useState([]);

  const setSize = useCallback((size) => setCurrentSize(size), [])
  const setImageSrc = useCallback((src) => setCurrentImageSrc(src), [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(selectedProductId)
        const color = data.colors.find((c) => c.id === selectedColorId);
        setProduct(data);
        setCurrentColor(color);
        setCurrentImageSrc(color.images[0]);
        setLoadingStatus('success');
      } catch (error) {
        if (error.message === 'Product not found') {
          setLoadingStatus('notFound');
        } else {
          setLoadingStatus('unknownError');
        }
      }
    };

    const fetchSizes = async () => {
      try {
        const data = await getSizes()
        setSizes(data)
      } catch (error) {
        console.err(error)
      }
    }
    
    fetchProduct();
    fetchSizes();
  }, [selectedProductId, selectedColorId]);

  const handleClickOnColor = useCallback((color) => {
    setCurrentColor(color);
    setCurrentImageSrc(color.images[0]);
    setCurrentSize('');
  }, []);

  const handleClickAddToCart = useCallback(() => {
    const newProduct = {
      color: currentColor.name,
      image: currentImageSrc,
      name: product.name,
      price: currentColor.price,
      size: `${currentSize.label} / ${currentSize.number}`,
    }
    
    store.addProduct(newProduct)
  }, [currentImageSrc, currentColor.name, currentColor.price, product.name, currentSize.label, currentSize.number])

  const mainContent = useMemo(() => (
    <Row xs={1} sm={2} className='mt-3 py-4'>
      <Col>
        <h1>{product.name}</h1>

        <div className='mt-3'>Выбрать цвет:</div>
        {product.colors?.map((color) => (
          <Button
            key={color.id}
            className='m-2 ms-0'
            onClick={() => handleClickOnColor(color)}
            active={color.id === currentColor.id}
          >
            {color.name}
          </Button>
        ))}

        <div className='mt-3'>Выбрать размер:</div>
        {sizes.map((size) => (
          <Button
            key={size.id}
            className='m-2 ms-0'
            onClick={() => setSize(size)}
            active={size === currentSize}
            disabled={!currentColor.sizes?.includes(size.id)}
          >
            {size.label} / {size.number}
          </Button>
        ))}
          
        <Button
          variant='success'
          className='d-block mt-3'
          onClick={handleClickAddToCart}
          disabled={!Boolean(currentSize)}
        >
          Добавить в корзину
        </Button>

        {Boolean(!currentColor.sizes?.length) && (<Alert variant='danger' className='mt-3 w-50'>Нет в продаже</Alert>)}
      </Col>

      <Col>
        <div>Цена: {currentColor.price} &#8381;</div>
        <div>Цвет: {currentColor.name}</div>
        <div>Размер: {currentSize ? `${currentSize.label} / ${currentSize.number}` : 'не выбран'}</div>
        <div>Описание: {currentColor.description}</div>
        <div>Изображения:</div>
        {currentColor.images?.map((img, i) => (
          <Button
            key={img}
            className='m-2 ms-0'
            onClick={() => setImageSrc(img)}
            active={img === currentImageSrc}
          >
            {`Фото ${i + 1}`}
          </Button>
        ))}
        <img className='d-block w-50' src={currentImageSrc} alt={`${product.name} ${currentColor.name}`} />
      </Col>
    </Row>
  ), [product, currentColor, currentImageSrc, currentSize, handleClickOnColor, sizes, setImageSrc, setSize]);

  const content = useMemo(() => {
    return {
      'pending': <Spinner />,
      'success': mainContent,
      'notFound': <Alert variant='danger' className='w-50 mt-3'>Товар не найден</Alert>,
      'unknownError': <Alert variant='danger' className='w-50 mt-3'>Произошла неизвестная ошибка. Попробуйте открыть страницу позже</Alert>,
    }
  }, [mainContent]);

  return (
    <Container className='my-4'>
      <Stack direction="horizontal" gap={3}>
        <Button variant='success'>
          <Link to={'/'} className='text-decoration-none text-light'>К списку товаров</Link>
        </Button>
        <Button variant='warning'>
          <Link to={'/cart'} className='text-decoration-none text-dark'>
            Перейти в корзину
            {Boolean(store.productsCount) && <Badge bg="danger" className='ms-2'>{store.productsCount}</Badge>}
          </Link>
        </Button>
      </Stack>
    
      {content[loadingStatus]}
    </Container>
  );
});

export default ProductPage;
