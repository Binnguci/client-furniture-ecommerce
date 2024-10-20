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

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={"/user-info"} element={<Personal/>}/>
                    </Route>
                    <Route path={"/sign-up"} element={<Register/>}/>
                    <Route path={"/verify-otp"} element={<OTPVerify/>}/>
                    <Route path={"/sign-in"} element={<SignIn/>}/>
                    <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                    <Route path={"/change-password"} element={<ChangePassword/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

    export default App
