import { Button } from "../ui/button"
import { Plus } from "lucide-react"


const TeamCreateButton = () => {
    return (
        <Button>
            Crea una squadra
            <Plus size={'icon'}/>
        </Button>
    )
}

export default TeamCreateButton