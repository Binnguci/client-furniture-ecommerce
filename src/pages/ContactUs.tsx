import GoogleMap from "../components/GoogleMap.tsx";
import HerobarContact from "../components/HerobarContact.tsx";
import {Button, Form, Input, Modal} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib} from "@fortawesome/free-solid-svg-icons/faPenNib";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import React, {useState} from "react";
import http from "../utils/http.ts";
import {FormContact} from "../types/formContact.ts";
import InforContact from "../components/InforContact.tsx";
import TextArea from "antd/lib/input/TextArea";
import {useNavigate} from "react-router-dom";

function ContactUs() {
    const initialValues: FormContact = {
        title: "",
        email: "",
        message: ""
    }

    const [form, setForm] = React.useState<FormContact>(initialValues);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => {
                console.log([name])
                console.log({
                    ...prevForm,
                    ...{[name]: value}
                })
                return {
                    ...prevForm,
                    ...{[name]: value}
                }
            }
        );
    };

    const sendData = async (data: FormContact) => {
        try {
            const response = await http.post("/user/support", data);
            console.log('Data sent successfully:', response.data);
            Modal.confirm({
                title: 'Gửi thành công!',
                content: 'Tin nhắn của bạn đã được gửi đi thành công.',
                okText: 'Tiếp tục',
                cancelText: 'Trang chủ',
                type: "success",
                onOk: () => {
                    setLoading(false);
                },
                onCancel: () => {
                    navigate('/');
                },
                okButtonProps:{
                    className: "!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                },
                cancelButtonProps:{
                    className: "!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                }
            });
        } catch (error) {
            console.log("chưa gửi dữ liệu đi")
            console.log(error)
            setLoading(false);
            Modal.confirm({
                title: 'Gửi thất bại!',
                content: 'Tin nhắn của bạn đã được gửi đi thất bại.',
                okText: 'Tiếp tục',
                cancelText: 'Trang chủ',
                type: "error",
                onOk: () => {
                    setLoading(false);
                },
                onCancel: () => {
                    navigate('/');
                },
                okButtonProps:{
                    className: "!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                },
                cancelButtonProps:{
                    className: "!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                }
            });
        }
    };

    const onFinish = async () => {
        console.log("Received values of form: ", form);
        await sendData(form);
    };
    return (
        <>
            <HerobarContact/>
            <section className="" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <h3 className="font-heading mb-4 font-bold tracking-tight dark:text-white text-4xl">
                                Liên hệ với chúng tôi
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <InforContact/>
                            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                                <h2 className="mb-4 text-2xl font-bold dark:text-white text-[#FFA726]">Hãy cho chúng tôi
                                    biết bạn cần
                                    gì?</h2>
                                <Form
                                    name="normal_contact"
                                    onFinish={onFinish}
                                    layout="vertical"
                                    requiredMark="optional"
                                >
                                    <Form.Item
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng điền chủ đề!",
                                            },
                                        ]}
                                    >
                                        <Input prefix={<FontAwesomeIcon icon={faPenNib}/>} placeholder="Chủ đề"
                                               name="title"
                                               value={form.title} onChange={handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng điền địa chỉ email!",
                                            },
                                        ]}
                                    >
                                        <Input prefix={<FontAwesomeIcon icon={faEnvelope}/>} placeholder="Email"
                                               name="email"
                                               value={form.email} onChange={handleChange}/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng điền nội dung muốn gửi!"
                                            }
                                        ]}>
                                        <TextArea name="message" rows={4} placeholder={"Nhập nội dung..."}
                                                  maxLength={1000} value={form.message} onChange={handleChange}/>
                                    </Form.Item>
                                    <Form.Item style={{marginBottom: "0px"}}>
                                        <Button variant={"solid"}
                                                className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                                                block
                                                loading={loading}
                                                htmlType="submit">
                                            Gửi
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <GoogleMap/>
        </>
    );
}

export default ContactUs;