import { Button } from "@/components/ui/button"
import { NavLink, Outlet } from "react-router"
import {Plus} from "lucide-react"
import NavMenus from "@/components/NavMenus"

const MainLayout = () => {

    return (
        <>
        <header className="px-4 w-full max-w-4xl mx-auto">
            <div className="p-2 mt-4 border rounded-2xl flex items-center justify-between">
                <p className="font-bold text-xl pl-2"><NavLink to={'/'}>TournamentManager</NavLink></p>
                <NavMenus />
                <Button>
                    Crea un torneo
                    <Plus size={'icon'}/>
                </Button>
            </div>
        </header>

        <Outlet />
        </>
    )
}

export default MainLayout