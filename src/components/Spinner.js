import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => (
  <div className='m-3'>
    <Spinner animation='border'>
      <span className='visually-hidden'>Идёт загрузка...</span>
    </Spinner>
  </div>
);

export default SpinnerComponent;
