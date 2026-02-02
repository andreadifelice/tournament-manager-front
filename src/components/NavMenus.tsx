import { NavLink } from "react-router"
import { Button } from "./ui/button"

const NavMenus = () => {
    return (
        <>
            <nav className="flex gap-3">
                <Button variant={'ghost'}><NavLink to={'/'}>Home</NavLink></Button>
                <Button variant={'ghost'}><NavLink to={'/teams'}>Squadre</NavLink></Button>
            </nav>
        </>
    )
}

export default NavMenus