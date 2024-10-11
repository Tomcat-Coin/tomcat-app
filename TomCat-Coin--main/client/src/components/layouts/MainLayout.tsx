
import { Outlet } from "react-router-dom";
import BottomNavigation from "../shared/BottomNavigation";

const MainLayout = () => {

    return (
        <div className="bg-[#000000] min-h-screen relative">
            <div className=" relative mb-16">
                <Outlet />
            </div>
     
            <BottomNavigation />
        </div>
    );
};

export default MainLayout;