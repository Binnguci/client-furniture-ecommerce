import {Outlet} from "react-router-dom";

function WithoutHeaderLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default WithoutHeaderLayout;