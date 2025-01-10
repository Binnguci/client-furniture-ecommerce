import React from "react";

interface BlockConfirmationModalProps {
    userId: number | null;
    isLocked: boolean;
    onConfirm: (id: number) => void;
    onCancel: () => void;
}

const BlockConfirmationModal: React.FC<BlockConfirmationModalProps> = ({
                                                                           userId,
                                                                           isLocked,
                                                                           onConfirm,
                                                                           onCancel
                                                                       }) => {
    if (!userId) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">
                    {isLocked ? "Xác Nhận Mở Khóa Tài Khoản" : "Xác Nhận Khóa Tài Khoản"}
                </h2>
                <p>
                    {isLocked
                        ? "Bạn có chắc chắn muốn mở khóa tài khoản này không?"
                        : "Bạn có chắc chắn muốn khóa tài khoản này không?"}
                </p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={() => onConfirm(userId)}
                        className={`px-4 py-2 bg-[#FFA726] text-black font-bold hover:bg-black hover:text-[#FFA726] rounded transition-colors`}
                    >
                        {isLocked ? "Mở Khóa" : "Khóa"}
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockConfirmationModal;
