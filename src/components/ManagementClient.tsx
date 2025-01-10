import {useEffect, useState} from "react";
import http from "../utils/http.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination.tsx";
import {User} from "../types/user.type.ts";
import CustomerDetailModal from "./CustomerDetailModal.tsx";
import BlockConfirmationModal from "./BlockConfirmationModal.tsx";
import {message} from "antd";
import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#FFA726",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontWeight: 700,
        fontSize: 11,
    },
}));

function ManagementClient() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState<User>();
    const [blockUserId, setBlockUserId] = useState<number | null>(null);
    const [isLocked, setIsLocked] = useState<number>(0);

    const itemsPerPage = 10;
    const [users, setUsers] = useState<User[]>([]);

    const fetchAccountUser = async () => {
        try {
            const response = await http.get("/admin/user/get-user");
            const userFetch = response.data.result;
            setUsers(userFetch);
        } catch (error: unknown) {
            console.error("Failed to fetch account user: ", error);
        }
    }

    const handleShowDetails = (customer: User) => {
        setSelectedCustomer(customer);
    };

    const handleCloseDetails = () => {
        setSelectedCustomer(undefined);
    };

    const handleShowBlockConfirmation = (id: number) => {
        setBlockUserId(id);
        setIsLocked(users.find((user) => user.id === id)?.isLocked || 0);
    };

    const handleCloseBlockConfirmation = () => {
        setBlockUserId(null);
        setIsLocked(0);
    };

    useEffect(() => {
        fetchAccountUser();
    }, []);

    const totalPages: number = users ? Math.ceil(users.length / itemsPerPage) : 1;

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const displayedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleConfirmBlock = async (userId: number) => {
        try {
            await http.get(`/admin/user/block-unblock/${userId}`);
            handleCloseBlockConfirmation();
            message.success("Thao tác thành công!");
            fetchAccountUser(); // Làm mới danh sách người dùng
        } catch (error) {
            console.error("Lỗi khi xử lý tài khoản:", error);
            message.error("Có lỗi xảy ra trong quá trình xử lý tài khoản.");
        }
    };


    return (
        <div className=" px-6">
            <div className="container mx-auto">
                {displayedUsers.length > 0 ? (
                    <form method="post">
                        <div className="overflow-x-auto">
                            <table className="w-full ">
                                <thead className="bg-[#FFA726]">
                                <tr>
                                    <th className="px-6 py-3 text-black font-bold text-center ">ID tài khoản</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Tên đăng nhập</th>
                                    <th className="px-6 py-3 text-black font-bold text-center ">Số điện thoại</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Tên đầy đủ</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Vai trò</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Ngày tạo tài khoản</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayedUsers.map((item) => (
                                    <tr className="border-t" key={item.id}>
                                        <td className="px-6 py-4 text-center">
                                            {item.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <h2 className="text-gray-800 font-medium">{item.username}</h2>
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 text-center">
                                            {item.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center space-x-2">
                                                {item.fullName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.role.name === "USER" ? "Người dùng" : "Nhân viên"}
                                        </td>
                                        <td className="px-6 py-4 text-black text-center">
                                            {item.createdAt}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center items-center gap-4">
                                            <CustomTooltip title={"Xem chi tiết"}>
                                            <button
                                                type="button"
                                                onClick={() => handleShowDetails(item)}
                                                className="hover:text-black text-[#4CAF50] transition-colors duration-300"
                                            >
                                                <FontAwesomeIcon icon={faEye}/>
                                            </button>
                                            </CustomTooltip>
                                            <CustomTooltip title={item.isLocked == 0 ? "Khóa" : "Mở khóa"}>
                                            <button
                                                type="button"
                                                onClick={() => handleShowBlockConfirmation(item.id!)}
                                                className={`hover:text-black transition-colors duration-300 ${
                                                    item.isLocked == 1 ? "text-red-500" : "text-green-500"
                                                }`}
                                            >
                                                <FontAwesomeIcon icon={item.isLocked == 0 ? faUnlock : faLock}/>
                                            </button>
                                            </CustomTooltip>

                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                ) : (
                    <p className="text-center text-gray-600">Không có sản phẩm nào.</p>
                )}
            </div>
            <div className={"mb-6"}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            {selectedCustomer && (
                <CustomerDetailModal
                    customer={selectedCustomer}
                    onClose={handleCloseDetails}
                />
            )}
            <BlockConfirmationModal
                userId={blockUserId}
                isLocked={isLocked == 1}
                onConfirm={handleConfirmBlock}
                onCancel={handleCloseBlockConfirmation}
            />
        </div>
    );
}

export default ManagementClient;