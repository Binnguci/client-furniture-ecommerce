import {PinContainer} from "./ui/3d-pin.tsx";

function GoogleMap() {
    return (
        <div className="h-[40rem] w-full flex items-center justify-center ">
            <PinContainer
                title="Xem trên google map"
                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+N%C3%B4ng+L%C3%A2m+TP.+H%E1%BB%93+Ch%C3%AD+Minh/@10.8712813,106.789187,1093m/data=!3m1!1e3!4m6!3m5!1s0x3175276398969f7b:0x9672b7efd0893fc4!8m2!3d10.8712764!4d106.7917617!16s%2Fm%2F02q4yqq?hl=vi-VN&entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D"
            >
                <div
                    className="flex basic-full w-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 h-[20rem] ">

                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                        Địa chỉ: Khu phố 6, phường Linh Trung, quận Thủ Đức, TP.Hồ Chí Minh
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Đến ngay cửa hàng của chúng tôi để trải nghiệm dịch vụ tốt nhất
                </span>
                    </div>
                    <div
                        className="flex flex-1 w-full rounded-lg mt-4  from-violet-500 via-purple-500 to-blue-500">
                        <iframe className={"flex-grow"}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4761.044466395239!2d106.78918695467287!3d10.871281277474065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1728972275911!5m2!1svi!2s"
                            width="1200px" height="200px" allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </PinContainer>
        </div>
    );
}

export default GoogleMap;