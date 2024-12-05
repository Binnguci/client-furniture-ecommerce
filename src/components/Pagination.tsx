interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    const pages: number[] = Array.from({length: totalPages}, (_: unknown, i: number): number => i + 1);

    return (
        <div className="flex items-center justify-center mt-8">
            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? "bg-gray-300 font-bold cursor-not-allowed" : "bg-black text-[#FFA726] font-bold hover:text-black hover:bg-[#FFA726]"
                }`}
                disabled={currentPage === 1}
                onClick={(): void => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            {pages.map((page: number) => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === page
                            ? "bg-[#FFA726] text-black font-bold"
                            : "bg-black text-white hover:bg-[#FFA726] hover:text-black font-bold"
                    }`}
                    onClick={(): void => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages
                        ? "bg-gray-300 font-bold cursor-not-allowed"
                        : "bg-black text-[#FFA726] font-bold hover:bg-[#FFA726] hover:text-black"
                }`}
                disabled={currentPage === totalPages}
                onClick={(): void => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
