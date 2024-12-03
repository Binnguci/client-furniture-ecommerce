import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

function CartPopup() {
    const cartItems = [
        { id: 1, name: "Throwback Hip Bag", color: "Salmon", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Medium Stuff Satchel", color: "Blue", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Zip Tote Basket", color: "White and black", image: "https://via.placeholder.com/50" },
    ];

    return (
        <div className="relative">
            {/* Icon Giỏ hàng */}
            <Link to={"/cart"}>
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        color={"#FFA726"}
                        size="lg"
                        className="cursor-pointer"
                    />
                </div>
            </Link>

            {/* Popup giỏ hàng */}
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-gray-800 hidden group-hover:block">
                {/* Danh sách sản phẩm */}
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b">
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md" />
                                <div className="flex-1 ml-4">
                                    <h4 className="text-sm font-medium">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.color}</p>
                                </div>
                            </div>
                        ))}
                        {/* Nút Checkout */}
                        <div className="mt-4">
                            <button className="w-full bg-[#FFA726] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                                Checkout
                            </button>
                            <Link to="/cart" className="block mt-2 text-center text-sm text-[#FFA726] hover:underline">
                                View Shopping Bag
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}

export default CartPopup;