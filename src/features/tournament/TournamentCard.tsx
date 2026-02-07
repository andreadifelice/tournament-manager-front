import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { TournamentService } from "@/features/tournament/tournament.service"
import type { Tournament } from "@/features/tournament/tournament.type"
import { BoxIcon, LoaderCircle, OctagonAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../../components/ui/empty"

const TournamentCard = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await TournamentService.list()
                // Filtro tornei passati
                /* const pastTournaments = data.filter((tournament) => {
                    if (!tournament.date) return false
                    return new Date(tournament.date) < new Date()
                }) 
                setTournaments(pastTournaments)
                */
                setTournaments(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            } 
            setLoading(false)
        }

        fetchTournaments()
    }, [])
    
    /* gestione caricamento degli elementi */
    if (loading){
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <LoaderCircle className="animate-spin" />
                    </EmptyMedia>
                    <EmptyTitle>Caricamento in corso</EmptyTitle>
                </EmptyHeader>
            </Empty>
        )
    }

    /* gestione per avviso di elementi non presenti */
    if (tournaments.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <BoxIcon/>
                    </EmptyMedia>
                    <EmptyTitle>Nessun torneo presente al momento</EmptyTitle>
                </EmptyHeader>
            </Empty>
        )
    }

    /* gestione errore caricamento degli elementi */
    if (error){
        return(
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <OctagonAlert/>
                    </EmptyMedia>
                    <EmptyTitle>{error}</EmptyTitle>
                </EmptyHeader>
            </Empty>
        )
    }

    
    return (
        <ItemGroup className="w-full gap-2">
            {tournaments.map((tournament) => (
                <Item key={tournament.id} variant="outline" className="border-2 shadow-gray-100 shadow-sm rounded-2xl">
                    <ItemContent className="gap-1">
                        <ItemTitle className="text-xl font-bold">{tournament.name}</ItemTitle>
                        <div className="flex flex-col justify-between">
                            <ItemDescription>{tournament.location}</ItemDescription>
                            <ItemDescription>Inizio: {tournament.date}</ItemDescription>
                        </div>
                    </ItemContent>
                </Item>
            ))}
        </ItemGroup>
    )
}

export default TournamentCard