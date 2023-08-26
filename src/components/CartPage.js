import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Stack,
  Toast,
} from 'react-bootstrap';
import { observer } from "mobx-react-lite";

import store from "../store/CartStore";

const CartPage = observer(() => {
  const [isShowToast, setShowToast] = useState(false)

  const showToast = useCallback(() => setShowToast(true), []);
  const hideToast = useCallback(() => setShowToast(false), []);

  const handleOnBuy = useCallback(() => {
    showToast()
    setTimeout(() => {
      store.clearCart()
    }, 4000)
  }, [])

  const cartValue = useMemo(() => {
    return store.productsList.reduce((acc, product) => acc + Number(product.price), 0)
  }, [store.productsList])

  return (
    <Container className='my-4'>
      <Stack direction="horizontal" gap={3}>
        <Button variant='success'>
          <Link to={'/'} className='text-decoration-none text-light'>К списку товаров</Link>
        </Button>

        <Button
          onClick={() => store.clearCart()}
          variant='danger'
          disabled={!store.productsCount}
        >
          Очистить корзину
        </Button>
      </Stack>

      {Boolean(store.productsCount) ? (
        <Row xs={2} className='g-3 mt-4'>
          <Col xs={10}>
            <Row xs={2} md={3} lg={4} xl={5} className='g-3'>
              {store.productsList.map((product) => (
                <Col key={product.id}>
                  <Card>
                    <Card.Img variant='top' src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Цвет: {product.color}</Card.Text>
                      <Card.Text>Размер: {product.size}</Card.Text>
                      <Card.Text>Цена: {product.price} &#8381;</Card.Text>
                      <div className='d-grid gap-2'>
                        <Button variant="outline-danger" onClick={() => store.removeProduct(product.id)}>
                          Удалить
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={2}>
            <Alert.Heading className='text-center'>Корзина</Alert.Heading>
            <div>Всего товаров: {store.productsCount}</div>
            <div>Общая сумма: {cartValue} &#8381;</div>
            <Button onClick={() => handleOnBuy()} disabled={!store.productsCount} className='mt-3'>Перейти к оформлению</Button>

            <Toast
              onClose={() => hideToast()}
              show={isShowToast}
              delay={3000}
              autohide
              className='w-auto mt-3'
            >
              <Toast.Header>
                Вы прекрасны, товары успешно оформлены &#128578;
              </Toast.Header>
            </Toast>
          </Col>
        </Row>
      ) : (
        <Alert variant='danger' className='mt-4 w-50'>Корзина пуста</Alert>
      )}
    </Container>
  )
});

export default CartPage;