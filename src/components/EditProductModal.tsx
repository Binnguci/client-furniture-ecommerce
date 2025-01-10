import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, Select} from 'antd';
import {ProductRequest} from '../types/productUdate.type.ts';
import http from '../utils/http.ts';

const {Option} = Select;

interface EditProductModalProps {
    product: ProductRequest;
    onClose: () => void;
    onSave: (updatedProduct: ProductRequest) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({product, onClose, onSave}) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategory = async () => {
        try {
            const response = await http.get('/admin/category');
            setCategories(response.data.result || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchSupplier = async () => {
        try {
            const response = await http.get('/admin/supplier');
            setSuppliers(response.data.result || []);
        } catch (error) {
            console.error('Failed to fetch suppliers:', error);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchSupplier();
        form.setFieldsValue(product);
    }, [product, form]);

    const onFinish = async (values: ProductRequest) => {
        const priceNumber = parseInt(values.price.replace(/\D/g, ''), 10);
        values.price = priceNumber.toString();
        const productRequest: ProductRequest = {
            id: values.id,
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
            const response = await http.put('/product/update', productRequest);
            if (response.data?.code === 200) {
                const updatedProduct = response.data.result;
                message.success('Cập nhật sản phẩm thành công!');
                const updatedProductRequest: ProductRequest = {
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    categoryID: updatedProduct.category.id,
                    description: updatedProduct.description,
                    price: updatedProduct.price,
                    stock: updatedProduct.stock,
                    image: updatedProduct.images[0]?.imageUrl || '',
                    supplierID: updatedProduct.supplier.id,
                };
                onSave(updatedProductRequest);
                onClose();
            } else {
                message.error('Cập nhật sản phẩm thất bại!');
            }
        } catch (error) {
            console.error('Failed to update product:', error);
            message.error('Đã xảy ra lỗi khi cập nhật sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible
            title="Chỉnh sửa sản phẩm"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button loading={loading}
                        className={"!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"}
                        key="submit"
                        type="primary"
                        onClick={() => form.submit()}>
                    Lưu
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="edit_product"
                onFinish={onFinish}
                initialValues={product}
            >
                <Form.Item
                    name="id"
                    hidden
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{required: true, message: 'Vui lòng nhập tên sản phẩm!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{required: true, message: 'Vui lòng nhập giá sản phẩm!'}]}
                >
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="stock"
                    label="Số lượng tồn kho"
                    rules={[{required: true, message: 'Vui lòng nhập số lượng tồn kho!'}]}
                >
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="categoryID"
                    label="Thể loại"
                    rules={[{required: true, message: 'Vui lòng chọn thể loại!'}]}
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
                    rules={[{required: true, message: 'Vui lòng chọn nhà cung cấp!'}]}
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

export default EditProductModal;
