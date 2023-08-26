import { RouterProvider } from 'react-router-dom';
import CartStoreProvider from './context/CartStoreProvider';

import router from './router';

const App = () => (
  <CartStoreProvider>
    <RouterProvider router={router} />
  </CartStoreProvider>
);

export default App;
