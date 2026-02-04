import NavMenus from "@/components/header/NavMenus"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <>
            <header className="px-4 w-full max-w-4xl mx-auto">
                <div className="p-2 mt-4 border-2 border-gray-100 shadow-sm rounded-2xl flex items-center justify-between">
                    <NavMenus />
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default MainLayout