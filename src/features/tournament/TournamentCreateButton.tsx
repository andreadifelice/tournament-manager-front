import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"


const TournamentCreateButton = () => {
    return (
        <Link to={'/tournaments'}>
            <Button>
                Crea un torneo
                <Plus size={'icon'}/>
            </Button>
        </Link>
    )
}

export default TournamentCreateButton