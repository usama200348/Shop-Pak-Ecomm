import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import './styles/global.css'
import { AuthContext,AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Products from './componetns/Products.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Categories from './pages/Categories.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute.jsx'
import AddItem from './pages/AddItem.jsx'
import Orders from './pages/Orders.jsx'
import EditItem from './pages/EditItem.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:"/product/:id",
        element:<ProductDetail/>
      },
      {
        path:'/cart',
        
        element :
        <ProtectedRoute>
        <Cart/>
        </ProtectedRoute>
      },
      {
        path:'/checkout',
        element:
        <ProtectedRoute>
          <Checkout/>
        </ProtectedRoute>
      },
      {
        path:'/products',
        element:<Products/>
      },
      {
        path:'/contact',
        element:<ContactUs/>
      },
      {
        path:'/categories',
        element:<Categories/>
      },
      {
        path:'/profile',
        element:<ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
      },
      {
        path:'/additem',
        element:
        <ProtectedRoute>
          <AddItem/>
       </ProtectedRoute> 
      },
      {
        path:'/orders',
        element:<Orders/>
      },
      {
        path:'edititem/:id',
        // path:'/edititem', 
        element:<EditItem/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </Provider>
)
