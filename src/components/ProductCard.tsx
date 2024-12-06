import {Link} from "react-router-dom";

interface ProductCardProps {
    img: string;
    name: string;
    price: string;
    id: number
}

function ProductCard({img, name, price, id}: ProductCardProps) {
    return (
        <div className="w-[250px] mx-auto">
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