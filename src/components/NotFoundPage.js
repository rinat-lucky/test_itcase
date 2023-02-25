import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Container>
    <Alert variant='danger' className='text-center mt-3'>
      Ошибка 404. К сожалению, страница не найдена. 
    </Alert>
    <div className='text-center'>
      <Link to='/'>Перейти на главную страницу </Link>
    </div>
  </Container>
);

export default NotFoundPage;
