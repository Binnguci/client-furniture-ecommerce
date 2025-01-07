import {useCallback, useEffect, useState} from "react";
import HeroBarShop from "../components/HerobarShop.tsx";
import ProductCard from "../components/ProductCard.tsx";
import Pagination from "../components/Pagination.tsx";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon, MinusIcon} from "@heroicons/react/20/solid";
import {Product} from "../types/product.type.ts";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store.ts";
import {fetchWishlist} from "../store/wishlist.slice.ts";
import {fetchProducts, searchProducts} from "../store/product.slice.ts";
import {debounce} from "@mui/material";

const sortOptions = [
    {name: 'Sản phẩm mới', href: '#', current: false},
    {name: 'Bán chạy', href: '#', current: false},
    {name: 'Giá từ thấp -> cao ', href: '#', current: false},
    {name: 'Giá từ cao -> thấp', href: '#', current: false},
]

const filters = [
    {
        id: 'supplier',
        name: 'Nhà cung cấp',
        options: [
            {value: 'IKEA', label: 'IKEA', checked: false},
            {value: 'Wayfair', label: 'Ashley', checked: false},
            {value: 'Ashley Furniture', label: 'Ashley', checked: false},
            {value: 'Herman Miller', label: 'Herman Miller', checked: false},
            {value: 'Décor Walther', label: 'Décor Walther', checked: false},
            {value: 'Ralph Lauren', label: 'Ralph Lauren', checked: false},
            {value: "Fürstenberg", label: "Fürstenberg", checked: false},
        ],
    },
    {
        id: 'category',
        name: 'Loại sản phẩm',
        options: [
            {value: 'Ghế', label: 'Ghế', checked: false},
            {value: 'Bàn', label: 'Bàn', checked: false},
            {value: 'Tủ', label: 'Tủ', checked: false},
            {value: 'Chén', label: 'Chén', checked: false},
            {value: 'Dĩa', label: 'Dĩa', checked: false},
            {value: 'Giường', label: 'Giường', checked: false},
            {value: 'Kệ', label: 'Kệ', checked: false},
            {value: 'Đèn', label: 'Đèn', checked: false},
            {value: 'Sofa', label: 'Sofa', checked: false},
            {value: 'Thảm', label: 'Thảm', checked: false},
            {value: 'Gương', label: 'Gương', checked: false},
            {value: 'Phụ kiện trang trí', label: 'Phụ kiện trang trí', checked: false},
        ],
    },
    {
        id: 'price',
        name: 'Giá tiền',
        options: [
            {value: '2l', label: '< 5.000.000 VND', checked: false},
            {value: '6l', label: '5.000.000 VND - 10.000.000 VND', checked: false},
            {value: '12l', label: '10.000.000 VND - 20.000.000 VND', checked: false},
            {value: '18l', label: '20.000.000 VND - 50.000.000 VND', checked: false},
            {value: '20l', label: '> 50.000.000 VND', checked: false},
        ],
    }
]

function classNames(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(" ");
}


function Shop() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const wishlist: Product[] = useSelector((state: RootState): Product[] => state.wishList.items);
    const dispatch = useAppDispatch();
    const products: Product[] = useSelector((state: RootState) => state.product.products);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

    const handleFilterChange = (sectionId: string, value: string) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [sectionId]: value,
        }));
    };

    function scrollTop() {
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        scrollTop()
        if (wishlist.length === 0) {
            dispatch(fetchWishlist());
        }
        if (products.length === 0) {
            dispatch(fetchProducts())
        }

        const queryString = new URLSearchParams(selectedFilters).toString();
        if (Object.keys(selectedFilters).length === 0) {
            if (products.length < 0) {
                dispatch(fetchProducts());
            }
        } else {
            handleSearch(queryString)
        }
    }, [dispatch, selectedFilters]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((queryString: string) => {
            dispatch(searchProducts(queryString));
        }, 300),
        [dispatch]
    );

    const totalPages: number = products ? Math.ceil(products.length / itemsPerPage) : 1;

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <HeroBarShop/>
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-black pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-black">Sản phẩm</h1>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Lọc
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">
                                {filters.map((section) => (
                                    <div key={section.id} className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <div
                                                className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-black">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                <MinusIcon aria-hidden="true" className="size-5 text-black"/>
                            </span>
                                            </div>
                                        </h3>
                                        <div className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                // checked={selectedFilters[section.id] === option.value}
                                                                onChange={() => handleFilterChange(section.id, option.value)}
                                                                className="col-start-1 row-start-1 rounded border border-gray-300 bg-white checked:!border-[#FFA726] checked:!bg-[#FFA726]"
                                                            />
                                                        </div>
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="text-sm text-gray-600"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </form>

                            <div className="lg:col-span-3">
                                {displayedProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {displayedProducts.map((product, index) => (
                                            <ProductCard
                                                key={index}
                                                img={product.images[0].imageUrl}
                                                name={product.name}
                                                price={product.price}
                                                id={product.id}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-10">
                                        <p>😕 Không tìm thấy sản phẩm phù hợp.</p>
                                        <p>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm lại!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
                <div className={"mb-6"}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Shop;
