import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import SubCreate from "./pages/admin/sub/SubCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import SellerRoute from "./components/routes/SellerRoute";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProductCreate from "./pages/seller/product/SellerProductCreate";
import AllSellerProducts from "./pages/seller/product/AllSellerProducts";
import UpgradeSeller from "./pages/user/UpgradeSeller";
import AdminDashboardv2 from "./pages/adminv2/AdminDashboardv2";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true);
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            console.log('CURRENT USER', res.data.name);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <SideDrawer />
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/register/complete" element={<RegisterComplete />}/>
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/user/history" element={<UserRoute><History /></UserRoute>} />
          <Route path="/user/password" element={<UserRoute><Password /></UserRoute>} />
          <Route path="/user/wishlist" element={<UserRoute><Wishlist /></UserRoute>} />
          <Route path="/user/upgrade-seller" element={<UserRoute><UpgradeSeller /></UserRoute>} />
          {/* <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> */}
          <Route path="/admin/category" element={<AdminRoute><CategoryCreate /></AdminRoute>} />
          <Route path="/admin/category/:slug" element={<AdminRoute><CategoryUpdate /></AdminRoute>} />
          <Route path="/admin/sub" element={<AdminRoute><SubCreate /></AdminRoute>} />
          <Route path="/admin/sub/:slug" element={<AdminRoute><SubUpdate /></AdminRoute>} />
          <Route path="/admin/product" element={<AdminRoute><ProductCreate /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AllProducts /></AdminRoute>} />
          <Route path="/admin/product/:slug" element={<AdminRoute><ProductUpdate /></AdminRoute>} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<CategoryHome />} />
          <Route path="/sub/:slug" element={<SubHome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/admin/coupon" element={<AdminRoute><CreateCouponPage /></AdminRoute>} />
          <Route path="/payment" element={<UserRoute><Payment /></UserRoute>} />
          <Route path="/seller/product" element={<SellerRoute><SellerProductCreate /></SellerRoute>} />
          <Route path="/seller/products" element={<SellerRoute><AllSellerProducts /></SellerRoute>} />
          <Route path="/seller/product/:slug" element={<SellerRoute><ProductUpdate /></SellerRoute>} />
          <Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />

        /*admin v2 */
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardv2/></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
