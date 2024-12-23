import { Form, Input, Select} from "antd";
import {OrderFormType} from "../types/orderForm.type.ts";
import {useState, useEffect} from "react";
import axios from "axios";
import {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";

interface AddressItem {
    id: number;
    name: string;
}
function FormInformationCheckout() {
    const [form] = Form.useForm();
    const {user} = useSelector((state: RootState) => state.auth);
    const [provinces, setProvinces] = useState<AddressItem[]>([]);
    const [districts, setDistricts] = useState<AddressItem[]>([]);
    const [wards, setWards] = useState<AddressItem[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);


    useEffect(() => {
        axios.get("https://api.vnaddress.vn/provinces")
            .then(response => {
                setProvinces(response.data);
            })
            .catch(error => {
                console.error("Error fetching provinces:", error);
            });
    }, []);

    const handleProvinceChange = (provinceId : number) => {
        setSelectedProvince(provinceId);
        axios.get(`https://api.vnaddress.vn/districts?province_id=${provinceId}`)
            .then(response => {
                setDistricts(response.data);
                setWards([]);
                setSelectedDistrict(null);
            })
            .catch(error => {
                console.error("Error fetching districts:", error);
            });
    };

    const handleDistrictChange = (districtId: number) => {
        setSelectedDistrict(districtId);
        axios.get(`https://api.vnaddress.vn/wards?district_id=${districtId}`)
            .then(response => {
                setWards(response.data);
            })
            .catch(error => {
                console.error("Error fetching wards:", error);
            });
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.fullName || "",
                phone: user.phone || "",
            });
        }
    }, [user, form]);


    const onFinish = (values: OrderFormType) => {
        console.log("Form Data:", values);
        alert("Form submitted successfully!");
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50">
            <h2 className="text-2xl text-[#FFA726] font-semibold mb-4">Thông tin mua hàng</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
            >
                <div className="flex space-x-4">
                    <Form.Item
                        label="Tên người đặt hàng"
                        name="name"
                        className="w-full"
                        rules={[
                            {required: true, message: "Tên người đặt hàng là bắt buộc"},
                        ]}
                    >
                        <Input placeholder="Tên đầy đủ"/>
                    </Form.Item>
                </div>
                <div className="flex space-x-4">
                    <Form.Item label="Tỉnh/Thành Phố" name="province">
                        <Select
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            placeholder="Chọn Tỉnh/Thành Phố"
                            options={provinces.map(province => ({
                                label: province.name,
                                value: province.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item label="Quận/Huyện" name="district">
                        <Select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            placeholder="Chọn Quận/Huyện"
                            options={districts.map(district => ({
                                label: district.name,
                                value: district.id
                            }))}
                            disabled={!selectedProvince}
                        />
                    </Form.Item>

                    <Form.Item label="Xã/Phường" name="ward">
                        <Select
                            value={wards}
                            placeholder="Chọn Xã/Phường"
                            options={wards.map(ward => ({
                                label: ward.name,
                                value: ward.id
                            }))}
                            disabled={!selectedDistrict}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{required: true, message: "Địa chỉ là bắt buộc"}]}
                    >
                        <Input placeholder="Ví dụ: 1178 Phạm Thế hiển"/>
                    </Form.Item>
                </div>
                <div className="flex space-x-4">
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        className="w-1/2"
                        rules={[
                            {required: true, message: "Số điện thoại là bắt buộc"},
                            {pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ"},
                        ]}
                    >
                        <Input placeholder="Số điện thoại"/>
                    </Form.Item>
                </div>

                <Form.Item label="Ghi chú" name="notes">
                    <Input.TextArea
                        rows={4}
                        placeholder="Ví dụ: Giao trước 10h sáng..."
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormInformationCheckout;
