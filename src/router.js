import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import NotFoundPage from "./components/NotFoundPage";
import ProductPage from "./components/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/:productId",
    element: <ProductPage />,
  },
]);

export default router;
