import {NavLink} from "react-router-dom";
import pageNotFound from "../assets/img/404.png";

function PageNotFound() {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center h-screen">

            <img src={pageNotFound} style={{width: '30rem'}} alt="Page Not Found"/>
            <p>Xin lỗi, trang hiện tại không tìm thấy</p>
            <NavLink to="/"
                     className="!bg-[#FFA726] p-1 px-2 mt-1 rounded !text-black font-bold  hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                     data-abc="true">Quay về trang
                chủ</NavLink>
        </div>

    )
        ;
}

export default PageNotFound;
