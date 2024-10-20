import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Logo from "./logo.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons';
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import {styled} from '@mui/material/styles';
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from "@headlessui/react";
import {ChevronDownIcon} from "lucide-react";

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

const brands = [
    {name: 'Décor Walther', href: '#'},
    {name: 'Ralph Lauren', href: '#'},
    {name: 'Fürstenberg', href: '#'},
    {name: 'Saint Louis', href: '#'},
    {name: 'IKEA', href: '#'},
]
const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);


    const handleToggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className="flex  py-4 px-4 sm:px-10 bg-black font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
                <a
                    href="javascript:void(0)"
                    className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
                >
                    <Logo/>
                </a>

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
                            <Link to="/" className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
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
                            {/*<Link to="/brands"*/}
                            {/*      className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">*/}
                            {/*    Thương hiệu*/}
                            {/*</Link>*/}
                            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                                <Popover className="relative">
                                    <PopoverButton
                                        className="flex items-center text-white hover:text-[#FFA726] gap-x-1 text-sm font-semibold leading-6 outline-none">
                                        Thương hiệu
                                        <ChevronDownIcon aria-hidden="true"
                                                         className="h-5 w-5 flex-none text-gray-400"/>
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition-all duration-200 ease-out
                                        className="absolute -left-8 top-full z-10 mt-3 w-[10.5rem] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="p-4">
                                            {brands.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                                >
                                                    <div className="flex-auto">
                                                        <Link to={item.href}
                                                              className="block font-semibold text-gray-900 group-hover:text-[#FFA726]">
                                                            {item.name}
                                                            <span className="absolute inset-0"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </PopoverGroup>
                        </li>
                        <li className="max-lg:border-b max-lg:py-3 px-3">
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-white block font-semibold text-[15px]">
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center ml-auto space-x-6">
                    <CustomTooltip title="Yêu thích">
                        <FontAwesomeIcon icon={faHeart} color={"#FFA726"}/>
                    </CustomTooltip>
                    <CustomTooltip title="Giỏ hàng">
                        <FontAwesomeIcon icon={faCartShopping} color={"#FFA726"}/>
                    </CustomTooltip>
                    {isLoggedIn ? (
                        <CustomTooltip title="Tài khoản">
                            <FontAwesomeIcon icon={faUser} color={"#FFA726"}/>
                        </CustomTooltip>
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
                        <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
};

export default Header;
