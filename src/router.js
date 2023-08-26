import { createBrowserRouter } from "react-router-dom";
import ProductsListPage from "./components/ProductsListPage";
import NotFoundPage from "./components/NotFoundPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsListPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/:productId/:colorId",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

export default router;
