'use client'
import React, {useRef} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, notification} from "antd";
import http from "../utils/http.ts";

type NotificationType = 'success' | 'error';

export default function OTPVerify() {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};
    const [api, contextHolder] = notification.useNotification();


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
            e.preventDefault();
        }

        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const target = e.currentTarget as HTMLInputElement;
        if (target.value) {
            if (index < inputs.current.length - 1) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (/^[0-9]{6}$/.test(text)) {
            const digits = text.split('');
            digits.forEach((digit, i) => {
                if (inputs.current[index + i]) {
                    inputs.current[index + i]!.value = digit;
                }
            });
            inputs.current[index + digits.length - 1]?.focus();
        }
    };

    const openNotificationWithIcon = (type: NotificationType) => {
        switch (type) {
            case 'success':
                api.success({
                    message: 'Xác thực thành công',
                    description: "Đăng nhập vào tài khoản để trải nghiệm",
                });
                break;
            case 'error':
                api.error({
                    message: 'Xác thực OTP thất bại',
                    description: "Vui lòng kiểm tra lại mã OTP",
                });
                break;
        }
    }
    const resendOTP = async () => {
        try {
            const response = await http.post("/auth/resend-otp", {
                email: email
            });
            console.log(email)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpCode = inputs.current.map(input => input?.value).join('');
        console.log(otpCode, email)
        try {
            const response = await http.post("/auth/verify-account", {
                email: email,
                otp: otpCode
            });
            openNotificationWithIcon('success');
            console.log(response.data);
            setTimeout(() => {
                navigate("/sign-in")
            },)
        } catch (error) {
            openNotificationWithIcon('error');
            console.error("Error during OTP verification", error);

        }
    };

    return (
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
            {contextHolder}
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                <div className="flex justify-center">
                    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold mb-1">Xác thực tài khoản</h1>
                            <p className="text-[15px] text-slate-500">Nhập mã OTP mà chúng tôi đã gửi về email của
                                bạn</p>
                        </header>
                        <form id="otp-form" onSubmit={handleSubmit}>
                            <div className="flex items-center justify-center gap-3">
                                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                                    <input
                                        key={index}
                                        type="numeric"
                                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        maxLength={1}
                                        ref={(el) => inputs.current[index] = el}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onInput={(e) => handleInput(e, index)}
                                        onFocus={handleFocus}
                                        onPaste={(e) => handlePaste(e, index)}
                                    />
                                ))}
                            </div>
                            <div className="max-w-[260px] mx-auto mt-4">
                                <Button
                                    variant={"solid"}
                                    color={"default"}
                                    htmlType={"submit"}
                                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                                >
                                    Xác nhận tài khoản
                                </Button>
                            </div>
                        </form>
                        <div className="text-sm text-slate-500 mt-4">
                            Chưa nhận được otp? <div onClick={() => resendOTP()}
                                                     className="font-bold text-black hover:cursor-pointer">Gửi lại</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

