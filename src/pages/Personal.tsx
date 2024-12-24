import {useState} from 'react';
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faEdit, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import binnguci from "../assets/img/avtbinnguci.jpg";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store.ts";
import {ChangePasswordForm} from "../components/ChangePasswordForm.tsx";
import {UserInfoForm} from "../components/UserInfor.tsx";
import {useNavigate} from "react-router-dom";
import http from "../utils/http.ts";
import {logout} from "../store/authActions.ts";
import axios from "axios";

export function Personal() {
    const [activeTab, setActiveTab] = useState<'history' | 'info' | 'password' | 'logout'>('info');
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <UserInfoForm
                        username={user.username || ""}
                        email={user.email || ""}
                        phone={user.phone || ""}
                        fullName={user.fullName || ""}
                    />
                );
            case 'history':
                return <div>Lịch sử mua hàng</div>;
            case 'password':
                return (<ChangePasswordForm/>);
            case 'logout':
                return "";
            default:
                return <div>Chọn một mục từ thanh điều hướng</div>;
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Không tìm thấy token trong localStorage');
                return;
            }
            const response = await http.post("/auth/logout", {token});
            dispatch(logout());
            console.log('Đăng xuất thành công:', response.data);
            navigate("/");
        } catch (error: unknown) {
            let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Lỗi không xác định từ máy chủ!';
            }
            console.error('Error sending data:', errorMessage);
        }
    }

    return (
        <div className="flex min-h-[750px] mt-20  text-white py-8 px-36">
            <nav className="w-1/4 shadow-2xl border border-[#FFA726] rounded-2xl font-bold text-black shadow-lg p-2">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                            src={binnguci}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg">
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                    </div>
                    <p className="mt-2 font-bold text-lg">Quản lý tài khoản</p>
                </div>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'info'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faUser}/> Thông tin người dùng
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'history'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faCartShopping}/> Lịch sử mua hàng
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'password'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faLock}/> Đổi mật khẩu
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'logout'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket}/> Đăng xuất
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="flex-1 p-6 text-black shadow-md rounded-lg mx-4 border border-[#FFA726]">
                {renderContent()}
            </div>
        </div>
    );
}
