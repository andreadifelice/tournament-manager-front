import { NavLink } from "react-router"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

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
        }
    ]

    return (
        <>
            <p className="font-bold text-xl pl-2"><NavLink to={'/'}>TournamentManager</NavLink></p>
            <nav className="flex gap-3">
                {/* array map per generare dinamicamente i bottoni */}
                {Items.map((item) => 
                    <Button variant={'link'}>
                        <NavLink to={item.link}>
                            {item.name}
                        </NavLink>
                    </Button>
                )}
            </nav>
            <Button>
                Crea un torneo
                <Plus size={'icon'}/>
            </Button>
        </>
    )
}

export default NavMenus