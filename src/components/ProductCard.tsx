import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartOutline} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import {useEffect} from "react";
import type {AppDispatch, RootState} from "../store/store.ts";
import {fetchWishlist, toggleWishlist} from "../store/wishlist.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {notification} from "antd";

const useAppDispatch: () => AppDispatch = useDispatch;

interface ProductCardProps {
    img: string;
    name: string;
    price: string;
    id: number;
}

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#FFA726",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontWeight: 700,
        fontSize: 11,
    },
}));

function ProductCard({img, name, price, id}: ProductCardProps) {
    const dispatch = useAppDispatch();
    const wishlist: number[] = useSelector((state: RootState): number[] => state.wishList.items);
    const [api, contextHolder] = notification.useNotification();

    useEffect((): void => {
        dispatch(fetchWishlist());
    }, [dispatch]);


    const isFavorite = wishlist.includes(id);

    const toggleFavorite = (): void => {
        dispatch(toggleWishlist({productID: id, isFavorite}));
        if (isFavorite) {
            api.warning({
                message: 'Đã hủy yêu thích sản phẩm',
            });
        } else {
            api.success({
                message: 'Đã thêm sản phẩm vào yêu thích',
            });
        }
    };
    console.log(wishlist);


    return (
        <div className="w-[250px] mx-auto relative">
            {contextHolder}
            <button
                className="absolute top-2 right-2 z-10 text-[#FFA726]"
                onClick={toggleFavorite}
            >
                {isFavorite ? (
                    <CustomTooltip title={"Hủy yêu thích"} placement="top">
                        <FontAwesomeIcon icon={faHeartSolid} className="w-6 h-6"/>
                    </CustomTooltip>
                ) : (
                    <CustomTooltip title={"Thêm vào yêu thích"} placement="top">
                        <FontAwesomeIcon icon={faHeartOutline} className="w-6 h-6"/>
                    </CustomTooltip>
                )}
            </button>
            <Link
                to={`/product/${id}`}
                className="block text-center relative pb-[50px] cursor-pointer group"
            >
                <img
                    src={img}
                    alt={name}
                    className="mb-[15px] relative top-0 transition-all duration-300 ease-in-out group-hover:-top-3"
                />
                <h3 className="font-extrabold text-[#2f2f2f]">{name}</h3>
                <strong className="font-semibold text-base text-[#2f2f2f]">{price}</strong>
                <button
                    className="absolute px-3 py-1 text-[#FFA726] font-bold bg-black bottom-[10px] left-1/2 -translate-x-1/2 rounded opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:bottom-0 hover:bg-[#FFA726] hover:text-black"
                >
                    Xem chi tiết
                </button>
                <div
                    className="absolute bottom-0 left-0 right-0 bg-[#f7e4c6] h-0 z-[-1] rounded-[10px] transition-all duration-300 ease-in-out group-hover:h-[50%]"
                ></div>
            </Link>
        </div>
    );
}

export default ProductCard;
