import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import http from '../utils/http.ts';
import {ProductRequest} from "../types/productUdate.type.ts";

const { Option } = Select;

interface AddProductModalProps {
    onClose: () => void;
    onSave: () => void; // Callback để load lại danh sách sản phẩm sau khi thêm
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSave }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await http.get('/admin/category');
            setCategories(response.data.result || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // Fetch suppliers
    const fetchSuppliers = async () => {
        try {
            const response = await http.get('/admin/supplier');
            setSuppliers(response.data.result || []);
        } catch (error) {
            console.error('Failed to fetch suppliers:', error);
        }
    };

    // Load dữ liệu khi modal mở
    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
    }, []);

    // Xử lý khi form submit
    const onFinish = async (values: ProductRequest) => {
        const productRequest = {
            name: values.name,
            categoryID: values.categoryID,
            description: values.description,
            price: values.price,
            stock: values.stock,
            image: values.image,
            supplierID: values.supplierID,
        };
        setLoading(true);
        console.log('Product Request:', productRequest);
        try {
            const response = await http.post('/admin/product', productRequest);
            if (response.data?.code === 200) {
                message.success('Thêm sản phẩm thành công!');
                onSave();
                onClose();
            } else {
                message.error('Thêm sản phẩm thất bại!');
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            message.error('Đã xảy ra lỗi khi thêm sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible
            title="Thêm sản phẩm"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    loading={loading}
                    className={
                        "!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0"
                    }
                    key="submit"
                    type="primary"
                    onClick={() => form.submit()}
                >
                    Thêm
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="add_product"
                onFinish={onFinish}
            >
                <Form.Item
                    name="image"
                    label="Link Ảnh"
                    rules={[{ required: true, message: 'Vui lòng nhập link ảnh!' }]}
                >
                    <Input placeholder="Nhập link ảnh sản phẩm" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder={"VD: 1000000 (1,000,000 VND)"}/>
                </Form.Item>

                <Form.Item
                    name="stock"
                    label="Số lượng tồn kho"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="categoryID"
                    label="Thể loại"
                    rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
                >
                    <Select placeholder="Chọn thể loại">
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="supplierID"
                    label="Nhà cung cấp"
                    rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                >
                    <Select placeholder="Chọn nhà cung cấp">
                        {suppliers.map((supplier) => (
                            <Option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
