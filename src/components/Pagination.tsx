interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center mt-8">
            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? "bg-gray-300 font-bold cursor-not-allowed" : "bg-black text-[#FFA726] font-bold hover:text-black hover:bg-[#FFA726]"
                }`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === page
                            ? "bg-[#FFA726] text-black font-bold"
                            : "bg-black text-white hover:bg-[#FFA726] hover:text-black font-bold"
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages
                        ? "bg-gray-300 font-bold cursor-not-allowed"
                        : "bg-black text-[#FFA726] font-bold hover:bg-gray-800"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
