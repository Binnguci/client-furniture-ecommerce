import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./logo.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons';
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import {styled} from '@mui/material/styles';
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from "@headlessui/react";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons/faBagShopping";
import http from "../utils/http.ts";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store.ts";
import {logout} from "../store/authActions.ts";
import {fetchCart} from "../store/cart.slice.ts";
import MiniCart from "./MiniCart.tsx";
import { selectIsLoggedIn } from "../store/auth.slice.ts";

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#FFA726",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontWeight: 700,
        fontSize: 11,
    },
}));

const accounts = [
    {option: "Thông tin tài khoản", href: "/personal", icon: faCircleInfo},
    {option: "Đơn hàng của tôi", href: "/my-order", icon: faBagShopping},
    {option: "Đăng xuất", href: "", icon: faArrowRightFromBracket},
]
const Header = () => {
        const [isMenuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const navigate = useNavigate();
        const [isVisible, setIsVisible] = useState(true);
        const header = useRef(null);
        const user = useSelector((state: RootState) => state.auth.user);
        const dispatch = useAppDispatch();
        const {cart} = useSelector((state: RootState) => state.cart)
        const [lastScrollY, setLastScrollY] = useState(0);
        const [showMiniCart, setShowMiniCart] = useState(false);
        const wishlistProducts = useSelector((state: RootState) => state.wishList.items);

        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };


        useEffect(() => {
            if (cart == null) {
                dispatch(fetchCart())
            }
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', handleScroll);
            }
            return () => {
                if (typeof window !== 'undefined') {
                    window.removeEventListener('scroll', handleScroll);
                }
            };
        }, [lastScrollY, isLoggedIn]);

        const handleToggleMenu = () => {
            setMenuOpen(!isMenuOpen);
        };

        const handleOnClick = async (option: string) => {
            if (option === "Đăng xuất") {
                    try {
                    const token = localStorage.getItem('accessToken');
                    if (!token) {
                        console.error('Không tìm thấy token trong localStorage');
                        return;
                    }
                    const response = await http.post("/auth/logout", {token});
                    dispatch(logout());
                    console.log('Đăng xuất thành công:', response.data);
                    navigate("/");
                } catch (error: unknown) {
                    let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';
                    if (axios.isAxiosError(error)) {
                        errorMessage = error.response?.data?.message || 'Lỗi không xác định từ máy chủ!';
                    }
                    console.error('Error sending data:', errorMessage);
                }
            }
        }

        return (
            <header
                ref={header}
                className={`flex header py-4 px-4 sm:px-10 bg-black font-[sans-serif] min-h-[70px] tracking-wide z-50 fixed w-full top-0  transition-[transform,opacity] duration-300 ease-in-out transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0 '
                }`}
            >

                <div className="flex flex-wrap items-center justify-between gap-4 w-full">
                    <Link to={"/"}
                          className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
                    >
                        <Logo/>
                    </Link>

                    <div
                        id="collapseMenu"
                        className={`max-lg:${isMenuOpen ? 'block' : 'hidden'} lg:block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
                    >
                        <button
                            id="toggleClose"
                            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                            onClick={handleToggleMenu}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black"
                                 viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"
                                ></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </button>

                        <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li className="mb-6 hidden max-lg:block">
                                <Link to="/">
                                    <Logo/>
                                </Link>
                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <Link to="/"
                                      className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <Link to="/products"
                                      className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
                                    Sản phẩm
                                </Link>

                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <Link to="/contact-us"
                                      className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
                                    Liên hệ
                                </Link>
                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <Link to="/about"
                                      className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
                                    Giới thiệu
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center ml-auto space-x-6">
                        <Link to={"/wishlist"}>
                            <CustomTooltip title="Yêu thích">
                                <FontAwesomeIcon icon={faHeart} color={"#FFA726"}/>
                            </CustomTooltip>
                            <span className="font-bold text-[#FFA726] py-1 ml-1">{wishlistProducts.length || 0}</span>
                        </Link>
                        <div className="relative flex items-center space-x-1" onMouseEnter={() => setShowMiniCart(true)}
                             onMouseLeave={() => setShowMiniCart(false)}>
                            <CustomTooltip title="Giỏ hàng">
                                <FontAwesomeIcon icon={faCartShopping} color={"#FFA726"}/>
                            </CustomTooltip>
                            {showMiniCart && <MiniCart />}
                            <span className="font-bold text-[#FFA726] py-1">{cart?.quantity || 0}</span>
                        </div>
                        {isLoggedIn ? (
                            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                                <Popover className="relative">
                                    <PopoverButton
                                        className="flex items-center text-white hover:text-[#FFA726] gap-x-1 text-sm font-semibold leading-6 outline-none">
                                        <CustomTooltip title="Tài khoản">
                                            <FontAwesomeIcon icon={faUser} color={"#FFA726"}/>
                                        </CustomTooltip>
                                        {user ? (
                                            <h1 className={"text-[#FFA726]"}>{user.username}</h1>
                                        ) : (
                                            <h1>Welcome, Guest</h1>
                                        )}
                                    </PopoverButton>
                                    <PopoverPanel
                                        transition-all duration-200 ease-out
                                        className="absolute -right-4 top-full z-10 mt-3 w-[15rem] max-w-md overflow-hidden rounded-2xl  bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="p-4">
                                            {accounts.map((item) => (
                                                <div
                                                    key={item.option}
                                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-3 hover:bg-gray-50"
                                                >
                                                    <div
                                                        className="flex w-0 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:text-[#FFA726]">
                                                        <FontAwesomeIcon icon={item.icon}/>
                                                    </div>
                                                    <div className="flex-auto">
                                                        <Link to={item.href}
                                                              onClick={() => handleOnClick(item.option)}
                                                              className="block font-semibold text-gray-900 group-hover:text-[#FFA726]">
                                                            {item.option}
                                                            <span className="absolute inset-0"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </PopoverGroup>
                        ) : (
                            <>
                                <button className="font-semibold text-[15px] border-none outline-none">
                                    <Link to="/sign-in" className="text-[#FFA726] hover:underline">
                                        Đăng nhập
                                    </Link>
                                </button>
                                <button
                                    className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#FFA726]  transition-all ease-in-out duration-300 hover:bg-[#FFA726] hover:text-black">
                                    <Link to="/sign-up">Đăng ký</Link>
                                </button>
                            </>
                        )}

                        <button id="toggleOpen" className="lg:hidden" onClick={handleToggleMenu}>
                            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
;

export default Header;
