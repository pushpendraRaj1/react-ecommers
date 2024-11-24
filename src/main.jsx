import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductDetails from './ProductDetails.jsx';
import WishlistPage from './context/Wishlist.jsx';
import MainContext from './context/MainContext.jsx';
import Cart from './context/Cart.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/product/:id",
    element: <ProductDetails/>,
  },
  {
    path: "/wishlist",
    element: <WishlistPage/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },


]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
    <RouterProvider router={router}  />
    </MainContext>
    
  </StrictMode>,
)
