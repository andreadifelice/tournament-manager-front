import NavMenus from "./NavMenus"
import ThemeButton from "./ThemeButton"

const NavBar = () => {
    return (
        <header className="px-4 w-full md:max-w-4xl mx-auto">
            <div className="p-2 mt-4 border-2 shadow-gray-100 shadow-sm rounded-2xl flex items-center justify-between">
                <NavMenus />
                <ThemeButton />
            </div>
        </header>
    )
}

export default NavBar