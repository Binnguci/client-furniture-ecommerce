import {SyntheticEvent, useState} from "react";
import product1 from "../assets/img/product-1.png";
import product2 from "../assets/img/product-2.png";
import product3 from "../assets/img/product-3.png";
import Reviews from "../components/Reviews.tsx";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function DetailProduct() {
    const product = {
        name: "Ghế tựa cao cấp",
        price: "53.785.000 VNĐ",
        description: "Ghế tựa cao cấp với chất liệu da bò thật 100%, thiết kế sang trọng, hiện đại, phù hợp với mọi không gian phòng khách.",
        sku: "0934",
        stock: "Có sẵn",
        images: [product1, product2, product3],
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [tabValue, setTabValue] = useState("review");

    const handleTabChange = (_: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    return (
        <div className="container mx-auto px-4 py-8 mt-24  ">
            <div className="grid grid-cols-[0.5fr_2.5fr_2fr] gap-6 px-20 pb-16">
                <div className="flex flex-col space-y-2">
                    {product.images.map((img: string, index: number) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Sub Image ${index + 1}`}
                            className={`cursor-pointer w-full h-30 object-cover border ${
                                selectedImage === img ? "border-orange-500" : "border-gray-300"
                            }`}
                            onClick={() => setSelectedImage(img)}
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
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-[#FFA726] font-semibold">{product.stock}</p>
                    <p className="text-lg font-semibold text-gray-700">{product.price}</p>
                    <p className="text-black">{product.description}</p>

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
                    </div>
                    <div>
                        <p className="text-black">SKU: <span className="font-medium text-black">{product.sku}</span></p>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className={"text-black"}>Chia sẽ:</span>
                            <a href="#" className="text-black hover:text-gray-700">🔗</a>
                            <a href="#" className="text-black hover:text-gray-700">📘</a>
                            <a href="#" className="text-black hover:text-gray-700">🐦</a>
                            <a href="#" className="text-black hover:text-gray-700">📸</a>
                        </div>
                    </div>
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
                    <Tab value="review" label="Đánh giá" sx={{
                        "&.Mui-selected": {color: "#FFA726"},
                    }}/>
                    <Tab value="details" label="Chi tiết" sx={{
                        "&.Mui-selected": {color: "#FFA726"},
                    }}/>
                </Tabs>
            </Box>

            {tabValue === "review" && (
                <Box >
                    <Reviews/>
                </Box>
            )}
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
        </div>
    );
}

export default DetailProduct;
