function FilterBar() {
    return (
        <div className="flex items-center justify-between mb-8 px-4 py-2 bg-[#FFA726] rounded-lg">
            <div className="flex items-center gap-4">
                <select
                    name="brand"
                    className="px-4 py-2 rounded border "
                    onChange={() => {}}
                >
                    <option value="">Tất cả hãng</option>
                    <option value="IKEA">IKEA</option>
                    <option value="Décor Walther">Décor Walther</option>
                    <option value="Ralph Lauren">Ralph Lauren</option>
                    <option value="Ralph Lauren">Fürstenberg</option>
                    <option value="Saint Louis">Ralph Lauren</option>
                </select>

                <select
                    name="price"
                    className="px-4 py-2 rounded border "
                    onChange={() => {}}
                >
                    <option value="">Tất cả giá</option>
                    <option value="low-to-high">Giá: Thấp - Cao</option>
                    <option value="high-to-low">Giá: Cao - Thấp</option>
                </select>

                <select
                    name="room"
                    className="px-4 py-2 rounded border "
                    onChange={() => {}}
                >
                    <option value="">Tất cả phòng</option>
                    <option value="living-room">Phòng khách</option>
                    <option value="bedroom">Phòng ngủ</option>
                    <option value="dining-room">Phòng ăn</option>
                    <option value="office">Phòng làm việc</option>
                    <option value="bathroom">Phòng tắm</option>
                    <option value="bathroom">Phòng bếp</option>
                </select>
            </div>
            <button className="px-4 py-2 text-[#FFA726] font-bold bg-black rounded hover:bg-[#FFA726] hover:text-black">
                Áp dụng
            </button>
        </div>
    );
}

export default FilterBar;
