import {Form, Input, Select} from "antd";
import {OrderFormType} from "../types/orderForm.type.ts";
import {useState, useEffect} from "react";
import axios from "axios";
import {RootState} from "../store/store.ts";
import {useSelector, useDispatch} from "react-redux";
import {setFormCheckout} from "../store/checkout.slice.ts";

interface Province {
    id: number;
    name: string;
}

function FormInformationCheckout() {
    const [form] = Form.useForm();
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<Province[]>([]);
    const [wards, setWards] = useState<Province[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);

    useEffect(() => {
        axios.get("https://esgoo.net/api-tinhthanh/1/0.htm")
            .then(response => setProvinces(response.data.data))
            .catch(error => console.error("Error fetching provinces:", error));
    }, []);

    const handleProvinceChange = (provinceId: number) => {
        setSelectedProvince(provinceId);
        axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
            .then(response => {
                setDistricts(response.data.data);
                setWards([]);
                setSelectedDistrict(null);
            })
            .catch(error => console.error("Error fetching districts:", error));
    };

    const handleDistrictChange = (districtId: number) => {
        setSelectedDistrict(districtId);
        axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
            .then(response => setWards(response.data.data))
            .catch(error => console.error("Error fetching wards:", error));
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

    const handleFormChange = (_: Record<string, unknown>, allValues: Record<string, unknown>) => {
        dispatch(setFormCheckout(allValues));

    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50">
            <h2 className="text-2xl text-[#FFA726] font-semibold mb-4">Thông tin mua hàng</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleFormChange}
                className="space-y-4"
            >
                <div className="flex space-x-4">
                    <Form.Item
                        label="Tên người đặt hàng"
                        name="name"
                        className="w-full"
                        rules={[{required: true, message: "Tên người đặt hàng là bắt buộc"}]}
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
                                value: province.id,
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
                                value: district.id,
                            }))}
                            disabled={!selectedProvince}
                        />
                    </Form.Item>

                    <Form.Item label="Xã/Phường" name="ward">
                        <Select
                            placeholder="Chọn Xã/Phường"
                            options={wards.map(ward => ({
                                label: ward.name,
                                value: ward.id,
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
                        <Input placeholder="Ví dụ: 1178 Phạm Thế Hiển"/>
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
                    <Input.TextArea rows={4} placeholder="Ví dụ: Giao trước 10h sáng..."/>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormInformationCheckout;
