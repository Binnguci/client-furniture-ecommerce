import {Link} from "react-router-dom";

function Home() {
    return (
        <div className={"gap-2 flex"}>
            <Link to={"/sign-up"}>đăng ký</Link>
            <Link to={"/sign-in"}>đăng nhập</Link>
            <Link to={"/verify-otp"}>OTP</Link>
        </div>
    );
}

export default Home;