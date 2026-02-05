import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"


const TeamCreateButton = () => {
    return (
        <Link to={'/teams'}>
            <Button>
                Crea una squadra
                <Plus size={'icon'}/>
            </Button>
        </Link>
    )
}

export default TeamCreateButton