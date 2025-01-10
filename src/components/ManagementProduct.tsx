import {useEffect, useState} from "react";
import {formatCurrencyWithoutSymbol} from "../utils/convertCurrencyToString.ts";
import {convertCurrencyStringToNumber} from "../utils/convertCurrencyToNumber.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Product} from "../types/product.type.ts";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store.ts";
import {fetchProducts} from "../store/product.slice.ts";
import Pagination from "./Pagination.tsx";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import EditProductModal from "./EditProductModal.tsx";
import {ProductRequest} from "../types/productUdate.type.ts";
import http from "../utils/http.ts";
import {message, Modal} from "antd";
import AddProductModal from "./AddProductModal.tsx";

function ManagementProduct() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedProduct, setSelectedProduct] = useState<ProductRequest>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    const products: Product[] = useSelector((state: RootState) => state.product.products);

    const showDeleteConfirm = (id: number) => {
        setProductToDelete(id);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete !== null) {
            try {
                const response = await http.delete(`/admin/product/${productToDelete}`);
                if (response.data?.code === 200) {
                    message.success('Xóa sản phẩm thành công!');
                    dispatch(fetchProducts());
                } else {
                    message.error('Xóa sản phẩm thất bại!');
                }
            } catch (error) {
                console.error('Failed to delete product:', error);
                message.error('Đã xảy ra lỗi khi xóa sản phẩm!');
            } finally {
                setIsDeleteModalVisible(false);
                setProductToDelete(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setProductToDelete(null);
    };

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products]);
    const totalPages: number = products ? Math.ceil(products.length / itemsPerPage) : 1;

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };
    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEditClick = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            const updatedProduct: ProductRequest = {
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                categoryID: product.category?.id || 0,
                description: product.description || "",
                image: product.images?.[0]?.imageUrl || "",
                supplierID: product.supplier?.id || 0,
            };
            console.log('Selected Product:', updatedProduct);
            setSelectedProduct(updatedProduct);
            setIsEditModalOpen(true);
        } else {
            console.error('Không tìm thấy sản phẩm với ID:', id);
        }
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProduct = (updatedProduct: ProductRequest) => {
        console.log('Updated Product:', updatedProduct);
        setIsEditModalOpen(false);
        fetchProducts();
    };

    // const handleDeleteProduct = async (id: number) => {
    //     console.log('Delete Product:', id);
    //     try {
    //         const response = await http.delete(`/admin/product/${id}`);
    //         if (response.data?.code === 200) {
    //             message.success('Xóa sản phẩm thành công!');
    //             dispatch(fetchProducts());
    //         } else {
    //             message.error('Xóa sản phẩm thất bại!');
    //         }
    //     } catch (error) {
    //         console.error('Failed to delete product:', error);
    //         message.error('Đã xảy ra lỗi khi xóa sản phẩm!');
    //     }
    // };

    const handleAddProduct = () => {
        setIsAddModalVisible(true);
    };

    const handleSave = () => {
        console.log('Reload product list');
    };
    return (
        <div className=" px-6">
            <button
                className={`px-4 py-2 mx-1 rounded bg-black text-[#FFA726] font-bold hover:bg-[#FFA726] hover:text-black transition-colors duration-300 mb-2`}
                onClick={() => handleAddProduct()}
            >
                Thêm sản phẩm
            </button>
            <div className="container mx-auto">
                {displayedProducts.length > 0 ? (
                    <form method="post">
                        <div className="overflow-x-auto">
                            <table className="w-full ">
                                <thead className="bg-[#FFA726]">
                                <tr>
                                    <th className="px-6 py-3 text-black font-bold text-center ">Sản phẩm</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Tên</th>
                                    <th className="px-6 py-3 text-black font-bold text-center ">Giá</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Số lượng tồn kho</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Loại</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Nhà cung cấp</th>
                                    <th className="px-6 py-3 text-black font-bold text-center">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayedProducts.map((item) => (
                                    <tr className="border-t" key={item.id}>
                                        <td className="px-6 py-4 text-center">
                                            <img
                                                src={item.images?.[0]?.imageUrl || ""}
                                                alt="Image"
                                                className="w-20 h-auto"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <h2 className="text-black font-medium">{item.name}</h2>
                                        </td>
                                        <td className="px-6 py-4 text-black text-center">
                                            {formatCurrencyWithoutSymbol(
                                                convertCurrencyStringToNumber(item.price)
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center space-x-2">
                                                {item.stock}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.category.name}
                                        </td>
                                        <td className="px-6 py-4 text-black text-center">
                                            {item.supplier.name}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleEditClick(item.id)}
                                                className="hover:text-black text-[#FFA726] transition-colors duration-300"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare}/>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => showDeleteConfirm(item.id)}
                                                className=" text-black hover:text-[#FFA726] transition-colors duration-300"
                                            >
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>

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
            {isEditModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSave={handleSaveProduct}
                />
            )}
            {isAddModalVisible && (
                <AddProductModal
                    onClose={() => setIsAddModalVisible(false)}
                    onSave={handleSave}
                />
            )}
            {isDeleteModalVisible && (
                <Modal
                    title="Xác nhận xóa sản phẩm"
                    visible={isDeleteModalVisible}
                    onOk={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    okText="Xác nhận"
                    cancelText="Hủy"
                    okButtonProps={{
                        className: 'bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0'
                    }}
                >
                    <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
                </Modal>

            )}
        </div>
    );
}

export default ManagementProduct;
