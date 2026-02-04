import { Button } from "../ui/button"
import { Plus } from "lucide-react"


const TournamentCreateButton = () => {
    return (
        <Button>
            Crea un torneo
            <Plus size={'icon'}/>
        </Button>
    )
}

export default TournamentCreateButton