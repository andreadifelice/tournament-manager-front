import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-100 flex flex-col justify-center items-center">
                <img src="./public/404_image.jpg" className="w-full animate-wiggle" />
                <h1 className="text-9xl font-bold text-primary animate-pulse">Errore!</h1>
            </div>
            <Button variant={'outline'} asChild>
                <Link to={'/'}>Torna alla home</Link>
            </Button>
        </div>
    )
}

export default NotFoundPage