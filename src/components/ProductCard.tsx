import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartOutline} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import http from "../utils/http.ts";
import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

interface ProductCardProps {
    img: string;
    name: string;
    price: string;
    id: number
}

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


function ProductCard({img, name, price, id}: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const location = useLocation();
    const email = location.state?.email;

    const toggleFavorite = async ():Promise<void> => {
        if (!email) {
            console.error("Email is required to add to wishlist.");
            return;
        }
        try {
            const requestBody = {
                email: email,
                productId: id,
            };

            if (isFavorite) {
                await http.delete("/product/add-to-wishlist", {
                    data: requestBody,
                });
            } else {
                await http.post("/product/add-to-wishlist", requestBody);
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div className="w-[250px] mx-auto relative">
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
            <Link to={`/product/${id}`}
                  className="block text-center relative pb-[50px] cursor-pointer group">
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