import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const MiniCart: React.FC = () => {
    const { cart } = useSelector((state: RootState) => state.cart);

    return (
        <div className="absolute top-full right-0 w-80 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
            {cart?.cartItemResponse.length ? (
                <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">Giỏ hàng của bạn</h4>
                    <ul className="max-h-60 overflow-y-auto" style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}>
                        {cart.cartItemResponse.map((item) => (
                            <li key={item.id} className="flex items-center justify-between mb-2 border-b pb-2">
                                <img
                                    src={item.productDTO.images[0].imageUrl}
                                    alt={item.productDTO.name}
                                    className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 ml-2">
                                    <p className="text-sm font-medium">{item.productDTO.name}</p>
                                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium">
                                    {item.productDTO.price}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <Link to="/cart">
                            <button className="w-full bg-[#FFA726] hover:bg-black text-black font-bold hover:text-[#FFA726] py-2 rounded transition-colors duration-300">
                                Xem chi tiết giỏ hàng
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">Giỏ hàng trống</p>
                </div>
            )}
        </div>
    );
};

export default MiniCart;
