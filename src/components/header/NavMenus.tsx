import { NavLink } from "react-router"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

const NavMenus = () => {
    // array di oggetti
    const Items = [
        {
            link: '/',
            name: 'Home'
        },
        {
            link: '/teams',
            name: 'Squadre'
        },
        {
            link: '/tournaments',
            name: 'Tornei'
        }
    ]

    return (
        <>
            <div className="flex flex-1 justify-between items-center px-4">
                    <div className="flex items-center">
                        <NavLink to={'/'}>
                            <img src="../public/logo_soccer.svg" className="w-18 hover:inset-shadow-sm inset-shadow-gray-200 rounded-4xl p-2"/>
                        </NavLink>
                        <p className="font-bold text-xl pl-2">SoccerBall</p>
                    </div>
                <nav className="flex gap-3">
                    {/* array map per generare dinamicamente i bottoni */}
                    {Items.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive
                                    ? cn(
                                        // cambia la variante in default se è active, togliendo anche l'hover
                                        buttonVariants({ variant: "default" }),
                                        "hover:bg-primary hover:text-primary-foreground"
                                    )
                                    // se non è active diventa "ghost" 
                                    : buttonVariants({ variant: "ghost" })
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default NavMenus