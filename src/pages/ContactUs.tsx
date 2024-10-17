import product2 from "../assets/img/product-2.png";
import GoogleMap from "../components/GoogleMap.tsx";
import {Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";

function ContactUs() {
    return (
        <>
            <section className={"gap-2 flex"}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
                            <div className="intro-excerpt">
                                <h1 className="text-4xl font-bold text-[#FFA726">Liên hệ</h1>
                                <p className="mb-4 text-[#FFA726]">Donec vitae odio quis nisl dapibus malesuada. Nullam
                                    ac
                                    aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                                <p>
                                    <a href="#"
                                       className="btn bg-black text-[#FFA726] rounded px-6 py-2  mr-4 hover:bg-[#FFA726] hover:text-black font-bold">Xem
                                        ngay</a>
                                    <a href="#"
                                       className="btn  text-black border-gray-800 rounded bg-[#FFA726] px-6 py-2 hover:bg-black hover:text-[#FFA726] font-bold">Khám
                                        phá</a>
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src={product2}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact
                        Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got
                        a technical issue? Want to send feedback about a beta feature? Need details about our Business
                        plan? Let us know.</p>
                    <Form
                        name="normal_signup"
                        onFinish={() => {
                        }}
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng điền địa chỉ email!",
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined/>} placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tiêu đề",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Tiêu đề"
                            />
                        </Form.Item>
                        <Form.Item
                            name="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập nội dung",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Nhập lại nội dung"
                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom: "0px"}}>
                            <Button
                                variant={"solid"}
                                color={"default"}
                                block
                                htmlType="submit"
                            >
                                Gửi thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
            <GoogleMap/>
        </>
    );
}

export default ContactUs;