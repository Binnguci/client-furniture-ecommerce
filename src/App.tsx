import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import OTPVerify from "./pages/OTPVerify.tsx";
import Home from "./pages/Home.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import {Personal} from "./pages/Personal.tsx";
import ContactUs from "./pages/ContactUs.tsx";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path={"/user-info"} element={<Personal/>}/>
                    <Route path={"/contact-us"} element={<ContactUs/>}/>
                    </Route>
                    <Route path={"/sign-up"} element={<Register/>}/>
                    <Route path={"/verify-otp"} element={<OTPVerify/>}/>
                    <Route path={"/sign-in"} element={<SignIn/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
