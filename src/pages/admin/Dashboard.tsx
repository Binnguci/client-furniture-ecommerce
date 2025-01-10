import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faEdit, faFile, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import binnguci from "../../assets/img/avtbinnguci.jpg"
import {useNavigate} from "react-router-dom";
import http from "../../utils/http.ts";
import axios from "axios";
import ManagementProduct from "../../components/ManagementProduct.tsx";
import ManagementClient from "../../components/ManagementClient.tsx";

export function Dashboard() {
    const [activeTab, setActiveTab] = useState<'staff' | 'account' | 'product' | 'logout' | 'order'>('account');
    const navigate = useNavigate();
    function scrollTop(){
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollTop();
    }, []);
    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return (<ManagementClient/>);
            case 'staff':
                return <div>Lịch sử mua hàng</div>;
            case 'product':
                return (<ManagementProduct/>);
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
        <div className="flex min-h-[750px] mt-20  text-white ">
            <nav className="w-1/4 h-screen border-r border-[#FFA726] p-2 font-bold text-black">
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
                    <p className="mt-2 font-bold text-lg">Quản trị viên</p>
                </div>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'account'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faUser}/>Quản lý tài khoản
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('product')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'product'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faBox}/> Quản lý sản phẩm
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('order')}
                            className={`w-full text-left p-2 rounded ${
                                activeTab === 'order'
                                    ? 'bg-[#FFA726] text-black'
                                    : 'hover:bg-[#FFA726] hover:text-black'
                            }`}
                        >
                            <FontAwesomeIcon icon={faFile} /> Quản lý đơn hàng
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
            <div className="flex-1 text-black shadow-md rounded-lg">
                {renderContent()}
            </div>
        </div>
    );
}
