function InforContact() {
    return (
        <div className="h-full pr-6 p-12">
            <ul className="mb-6 md:mb-0">
                <li className="flex">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded bg-black text-[#FFA726]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="h-6 w-6">
                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                            <path
                                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                    </div>
                    <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-[#FFA726] dark:text-white">Địa
                            chỉ</h3>
                        <p className=" dark:text-slate-400">Khu phố 6 phường Linh
                            Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                    </div>

                </li>
                <li className="flex">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded bg-black text-[#FFA726]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             fill="currentColor" className="size-6">
                            <path fill-rule="evenodd"
                                  d="M19.5 9.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L16.06 9h2.69a.75.75 0 0 1 .75.75Z"
                                  clip-rule="evenodd"/>
                            <path fill-rule="evenodd"
                                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </div>
                    <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6  dark:text-white text-[#FFA726]">Liên
                            hệ</h3>
                        <p className="dark:text-slate-400">(+84) 901323070</p>
                        <p className="dark:text-slate-400">Hotline: 0901323070</p>
                    </div>

                </li>
                <li className="flex">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded bg-black text-[#FFA726]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             fill="currentColor" className="size-6">
                            <path fill-rule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </div>
                    <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-[#FFA726] dark:text-white">Giờ
                            mở cửa</h3>
                        <p className=" dark:text-slate-400">Thứ 2 - Thứ 6: 7h sáng -
                            22h tối</p>
                        <p className=" dark:text-slate-400">Thứ 7 - Chủ nhật: 7h sáng -
                            22h tối</p>
                    </div>

                </li>
            </ul>
        </div>
    );
}

export default InforContact;