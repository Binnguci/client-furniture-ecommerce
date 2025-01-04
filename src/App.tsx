import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import OTPVerify from "./pages/OTPVerify.tsx";
import Home from "./pages/Home.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import {Personal} from "./pages/Personal.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import FAQ from "./pages/FAQ.tsx";
import DetailProduct from "./pages/DetailProduct.tsx";
import WaitVerifyAccount from "./pages/WaitVerifyAccount.tsx";
import Cart from "./pages/Cart.tsx";
import Shop from "./pages/Shop.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import WithoutHeaderLayout from "./layout/WithoutHeaderLayout.tsx";
import {useEffect} from "react";
import {loadAuthFromStorage} from "./store/authActions.ts";
import {useAppDispatch} from "./store/store.ts";
import Checkout from "./pages/Checkout.tsx";
import PaymentCancel from "./pages/PaymentCancel.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAuthFromStorage());
    }, [dispatch]);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={"/user-info"} element={<Personal/>}/>
                        <Route path={"/contact-us"} element={<ContactUs/>}/>
                        <Route path={"/faqs"} element={<FAQ/>}/>
                        <Route path={"/product/:id"} element={<DetailProduct/>}/>
                        <Route path={"/products"} element={<Shop/>}/>
                        <Route path={"/personal"} element={<Personal/>}/>
                        <Route path={"/cart"} element={<Cart/>}/>
                        <Route path={"/wishlist"} element={<Wishlist/>}/>
                        <Route path={"/about"} element={<AboutUs/>}/>
                        <Route path={"/payment"} element={<Checkout/>}/>
                        <Route path={"/payment/cancel"} element={<PaymentCancel/>}/>
                        <Route path={"/payment/success"} element={<PaymentSuccess/>}/>
                    </Route>
                    <Route element={<WithoutHeaderLayout/>}>
                        <Route path={"/sign-up"} element={<Register/>}/>
                        <Route path={"/verify-otp"} element={<OTPVerify/>}/>
                        <Route path={"/sign-in"} element={<SignIn/>}/>
                        <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                        <Route path={"/change-password"} element={<ChangePassword/>}/>
                        <Route path="/wait-verify" element={<WaitVerifyAccount/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
