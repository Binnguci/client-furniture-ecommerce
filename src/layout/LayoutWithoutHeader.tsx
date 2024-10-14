import {Outlet} from "react-router-dom";

function LayoutWithoutHeader() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default LayoutWithoutHeader;