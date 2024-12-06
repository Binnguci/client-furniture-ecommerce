import {SyntheticEvent, useEffect, useState} from "react";
import Reviews from "../components/Reviews.tsx";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useParams} from "react-router-dom";
import {Product} from "../types/product.type.ts";
import http from "../utils/http.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import RatingSummary from "../components/ReactSumary.tsx";

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

function DetailProduct() {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [tabValue, setTabValue] = useState("details");
    const productPlaceholder = "https://via.placeholder.com/400";

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect((): void => {
        scrollToTop();
        (async () => {
            try {
                const response = await http.get(`/product/detail/${id}`);
                setProduct(response.data.result);
                setSelectedImage(response.data.result.images?.[0]?.imageUrl || productPlaceholder);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        })();
    }, [id]);

    const handleTabChange = (_: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    return (
        <div className="container mx-auto px-4 py-8 mt-28">
            <div className="grid grid-cols-[0.5fr_2.5fr_2fr] gap-6 px-20 pb-16 sticky">
                <div className="flex flex-col space-y-2 ">
                    {product?.images.map((img, index) => (
                        <img
                            key={index}
                            src={img.imageUrl}
                            alt={`Sub Image ${index + 1}`}
                            className={`cursor-pointer w-full h-30 object-cover border ${
                                selectedImage === img.imageUrl ? "border-orange-500" : "border-gray-300"
                            }`}
                            onClick={() => setSelectedImage(img.imageUrl)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full max-h-[400px] object-contain rounded"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{product?.name}</h1>

                    <p className="text-[#FFA726] font-semibold">Còn lại: {product?.stock}</p>
                    <p className="text-lg font-semibold text-gray-700">{product?.price}</p>
                    <p className="text-black">{product?.description}</p>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded">
                            <button className="px-2 py-1 text-gray-700">-</button>
                            <input
                                type="text"
                                value="1"
                                className="w-8 text-center border-none outline-none"
                                readOnly
                            />
                            <button className="px-2 py-1 text-gray-700">+</button>
                        </div>

                        <button
                            className="px-4 py-1 bg-[#FFA726] text-black rounded hover:bg-black hover:text-[#FFA726] font-bold transition-colors duration-300">
                            Thêm vào giỏ hàng
                        </button>
                        <CustomTooltip title="Thêm vào yêu thích">
                            <button
                                className="px-4 py-1 bg-[#FFA726] text-black  rounded  font-bold transition-colors duration-300">
                                <FontAwesomeIcon icon={faHeart}/>
                            </button>
                        </CustomTooltip>
                    </div>
                    <div>

                    </div>
                    <RatingSummary/>
                </div>
            </div>
            <Box sx={{width: "100%", marginTop: 4}}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    aria-label="Product detail tabs"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#FFA726",
                        },
                    }}
                >
                    <Tab value="details" label="Chi tiết" sx={{
                        "&.Mui-selected": {color: "#FFA726", fontWeight: "bold"},
                    }}/>
                    <Tab value="review" label="Đánh giá" sx={{
                        "&.Mui-selected": {color: "#FFA726", fontWeight: "bold"},
                    }}/>

                </Tabs>
            </Box>
            {tabValue === "details" && (
                <Box sx={{padding: 2}}>
                    <h3 className="text-lg font-semibold mb-2">Thông tin chi tiết</h3>
                    <p>
                        Ghế tựa cao cấp được sản xuất từ chất liệu da bò thật, thiết kế sang trọng,
                        được nhập khẩu từ Ý, đảm bảo sự thoải mái và bền bỉ qua thời gian.
                    </p>
                    <p>Khung ghế được làm từ thép không gỉ, chịu tải trọng lớn.</p>
                </Box>
            )}
            {tabValue === "review" && (
                <Box>
                    <Reviews reviews={product?.reviewDTO || []}/>
                </Box>
            )}

        </div>
    );
}

export default DetailProduct;
