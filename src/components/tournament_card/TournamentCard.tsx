import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { TournamentService } from "@/features/tournament/tournament.service"
import type { Tournament } from "@/features/tournament/tournament.type"
import { BoxIcon } from "lucide-react"
import { useEffect, useState } from "react"
import TournamentCreateButton from "../buttons/TournamentCreateButton"
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

const TournamentCard = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await TournamentService.list()
                // Filtro tornei passati
                const pastTournaments = data.filter((tournament) => {
                    if (!tournament.date) return false
                    return new Date(tournament.date) < new Date()
                })
                setTournaments(pastTournaments)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            } finally {
                setLoading(false)
            }
        }

        fetchTournaments()
    }, [])
    
    if (loading) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center">caricamento...</div>

    /* gestione per avviso di elementi non presenti */
    if (tournaments.length === 0) {
        return (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <BoxIcon/>
                        </EmptyMedia>
                        <EmptyTitle>Nessuno torneo presente al momento</EmptyTitle>
                    </EmptyHeader>
                    <EmptyContent>
                        <TournamentCreateButton />
                    </EmptyContent>
                </Empty>
        )
    }

    if (error) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center text-red-500">{error}</div>

    
    return (
        <ItemGroup className="w-full gap-2">
            {tournaments.map((tournament) => (
                <Item key={tournament.id} variant="outline" className="border-2 border-gray-100 shadow-sm rounded-2xl">
                    <ItemContent className="gap-1">
                        <ItemTitle className="text-2xl font-bold">{tournament.name}</ItemTitle>
                        <div className="flex flex-col justify-between">
                            <ItemDescription>{tournament.location}</ItemDescription>
                            <ItemDescription>{tournament.date}</ItemDescription>
                        </div>
                    </ItemContent>
                </Item>
            ))}
        </ItemGroup>
    )
}

export default TournamentCard