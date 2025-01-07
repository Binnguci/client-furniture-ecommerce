// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
// }
//
// function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
//     const pages: number[] = Array.from({length: totalPages}, (_: unknown, i: number): number => i + 1);
//
//     return (
//         <div className="flex items-center justify-center mt-8">
//             <button
//                 className={`px-4 py-2 mx-1 rounded ${
//                     currentPage === 1 ? "bg-gray-300 font-bold cursor-not-allowed" : "bg-black text-[#FFA726] font-bold hover:text-black hover:bg-[#FFA726]"
//                 }`}
//                 disabled={currentPage === 1}
//                 onClick={(): void => onPageChange(currentPage - 1)}
//             >
//                 Trang đầu
//             </button>
//             {pages.map((page: number) => (
//                 <button
//                     key={page}
//                     className={`px-4 py-2 mx-1 rounded ${
//                         currentPage === page
//                             ? "bg-[#FFA726] text-black font-bold"
//                             : "bg-black text-white hover:bg-[#FFA726] hover:text-black font-bold"
//                     }`}
//                     onClick={(): void => onPageChange(page)}
//                 >
//                     {page}
//                 </button>
//             ))}
//             <button
//                 className={`px-4 py-2 mx-1 rounded ${
//                     currentPage === totalPages
//                         ? "bg-gray-300 font-bold cursor-not-allowed"
//                         : "bg-black text-[#FFA726] font-bold hover:bg-[#FFA726] hover:text-black"
//                 }`}
//                 disabled={currentPage === totalPages}
//                 onClick={(): void => onPageChange(currentPage + 1)}
//             >
//                 Trang cuối
//             </button>
//         </div>
//     );
// }
//
// export default Pagination;
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const MAX_VISIBLE_PAGES = 5;

    const generatePages = () => {
        const pages: (number | string)[] = [];
        const half = Math.floor(MAX_VISIBLE_PAGES / 2);

        if (currentPage > half + 1) {
            pages.push(1, '...');
        }

        const start = Math.max(2, currentPage - half);
        const end = Math.min(totalPages - 1, currentPage + half);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - half) {
            pages.push('...', totalPages);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex items-center justify-center mt-8">
            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-black text-[#FFA726] font-bold"
                }`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
            >
                Trang đầu
            </button>

            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-black text-[#FFA726] font-bold"
                }`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ‹
            </button>

            {pages.map((page, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === page
                            ? "bg-[#FFA726] text-black font-bold"
                            : "bg-black text-white hover:bg-[#FFA726] hover:text-black"
                    }`}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={typeof page !== 'number'}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-black text-[#FFA726] font-bold"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                ›
            </button>

            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-black text-[#FFA726] font-bold"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
            >
                Trang cuối
            </button>
        </div>
    );
}

export default Pagination;
