import {Link, useLocation, useNavigate} from "react-router-dom";
import LogoVertical from "../components/LogoVertical.tsx";
import {Button} from "antd";
import {useEffect} from "react";
import http from "../utils/http.ts";

function WaitVerifyAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        const checkVerificationStatus = async () => {
            console.log(email);
            try {
                const response = await http.get("/auth/check-account-verification-status", {
                    params: { email: email }
                });
                if (response.data === true) {
                    navigate("/sign-in");
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra trạng thái xác thực:", error);
            }
        };
        const intervalId = setInterval(checkVerificationStatus, 5000);

        return () => clearInterval(intervalId);
    }, [navigate]);
    return (
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
            <Link to={"/"} className="absolute top-4 left-4">
                <LogoVertical/>
            </Link>
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                <div className="flex justify-center">
                    <div className="max-w-md mx-auto text-center px-4 sm:px-8 py-10">
                        <header className="mb-8">
                            <h1 className="text-2xl text-[#FFA726] font-bold mb-1">Đang chờ xác thực tài khoản</h1>
                            <p className="text-[15px]">Truy cập vào email vừa đăng ký để xác thực tài khoản mà chúng tôi vừa gửi</p>
                        </header>
                        <Button type="primary"
                                className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                                onClick={() =>{}}>
                            Gửi lại email xác thực
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default WaitVerifyAccount;