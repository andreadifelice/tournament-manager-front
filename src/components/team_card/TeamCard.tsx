import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { Pen, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"

const TeamCard = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await TeamService.list()
                setTeams(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            } finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [])
    
    if (loading) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center">Caricamento...</div>
    if (error) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center text-red-500">{error}</div>

    
    return (
        <ItemGroup className="w-full gap-2">
            {teams.map((team) => (
                <Item key={team.id} variant="outline" className="border-2 border-gray-100 shadow-sm rounded-2xl">
                    <ItemContent className="gap-1">
                        <ItemTitle>{team.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        {/* modifica */}
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Pen />
                        </Button>
                        {/* elimina */}
                        <Button variant="destructive" size="icon" className="rounded-full">
                            <Trash2Icon />
                        </Button>
                    </ItemActions>
                </Item>
            ))}
        </ItemGroup>
    )
}

export default TeamCard