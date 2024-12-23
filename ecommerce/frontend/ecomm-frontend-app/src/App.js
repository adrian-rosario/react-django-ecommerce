import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./components/views/Home";
// router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/views/ProductDetail";
import Cart from "./components/views/Cart";
import Checkout from "./components/views/Checkout";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Profile from "./components/views/Profile";
import Shipping from "./components/views/Shipping";
import Payment from "./components/views/Payment";
import Order from "./components/views/Order";
import PlacedOrder from "./components/views/PlacedOrder";
import ListUsers from "./components/views/ListUsers";
import AdminEditUser from "./components/views/AdminEditUser";
import AdminEditProducts from "./components/views/AdminEditProducts";
import AdminEditProduct from "./components/views/AdminEditProduct";
import AdminOrders from "./components/views/AdminOrders";

function App() {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Routes>
            <Route index element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart/:id?' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/view/:id' element={<PlacedOrder />} />
            <Route path='/user-list' element={<ListUsers />} />
            <Route path='/admin-edit-user/:id' element={<AdminEditUser />} />
            <Route
              path='/admin-edit-products'
              element={<AdminEditProducts />}
            />
            <Route
              path='/admin-edit-product/:id'
              element={<AdminEditProduct />}
            />
            <Route path='/admin-edit-orders' element={<AdminOrders />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
