import { Drawer } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"
import { Button, buttonVariants } from "../ui/button"
import { DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "../ui/drawer"

const NavMenus = () => {
    const [isOpen, setIsOpen] = useState(false)
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
                            <img src="../public/logo_soccer.svg" className="w-18 hover:inset-shadow-sm rounded-4xl p-2 logo-soccer"/>
                        </NavLink>
                        <p className="font-bold text-xl pl-2 hidden md:flex">SoccerBall</p>
                    </div>
                {/* voci del menu in modalità desktop */}
                <nav className="hidden md:flex gap-3">
                    {/* array map per generare dinamicamente le voci delle pagine */}
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
                {/* hamburger con drawer a destra */}
                <div className="flex md:hidden">
                    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="default" className="border-gray-200">
                                <Menu size={'icon'}/>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                        <DrawerHeader className="flex items-end">
                            <DrawerClose asChild>
                                <Button variant="outline" className="border-gray-200 w-10 h-10">
                                    <X size={'icon'} className="text-primary"/>
                                </Button>
                            </DrawerClose>
                        </DrawerHeader>
                            <nav className="flex flex-col no-scrollbar overflow-y-auto px-4">
                                {/* array map per generare dinamicamente le voci delle pagine */}
                                {Items.map((item) => (
                                    <NavLink
                                        key={item.link}
                                        to={item.link}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? cn(
                                                    // cambia la variante in default se è active, togliendo anche l'hover
                                                    buttonVariants({ variant: "default" }),
                                                    "text-md hover:bg-primary hover:text-primary-foreground justify-end"
                                                )
                                                // se non è active diventa "ghost" 
                                                : cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    "text-md justify-end"
                                                )
                                            }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </>
    )
}

export default NavMenus