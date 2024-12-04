import {useState} from "react";
import HerobarShop from "../components/HerobarShop.tsx";
import ProductCard from "../components/ProductCard.tsx";
import Pagination from "../components/Pagination.tsx";
import product1 from "../assets/img/product-1.png";
import {useNavigate} from "react-router-dom";

function Shop() {
    const products = Array(30).fill({
        id: 1,
        name: "Nordic Chair",
        price: "$50.00",
        img: product1,
    });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleClick = (id: number): void => {
        navigate(`/product/${id}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <HerobarShop/>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4 md:col-span-1">
                        {/*Thêm component filter ở đây*/}
                    </div>
                    <div className="col-span-4 md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    img={product.img}
                                    name={product.name}
                                    price={product.price}
                                    onClick={() => handleClick(product.id)}
                                />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
