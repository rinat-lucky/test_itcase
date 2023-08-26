import { CartStoreContext } from './index.js';
import store from "../store/CartStore";

const CartStoreProvider = ({ children }) => {
  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
};

export default CartStoreProvider;