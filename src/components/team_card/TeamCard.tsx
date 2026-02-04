import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { BoxIcon, Pen, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import TeamCreateButton from "../buttons/TeamCreateButton"
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

const TeamCard = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingTeam, setEditingTeam] = useState<Team | null>(null)
    const [formData, setFormData] = useState({ name: "", power: "" })
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const handleEditClick = (team: Team) => {
        setEditingTeam(team)
        setFormData({ name: team.name, power: team.power || "" })
        setIsModalOpen(true)
    }

    const handleSave = async () => {
        if (!editingTeam) return

        try {
            await TeamService.update(editingTeam.id, {
                name: formData.name,
                power: formData.power,
            })
            setTeams(
                teams.map((t) =>
                    t.id === editingTeam.id
                        ? { ...t, name: formData.name, power: formData.power }
                        : t
                )
            )
            setIsModalOpen(false)
            setEditingTeam(null)
        } catch (err) {
            console.error("Errore nell'aggiornamento:", err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await TeamService.delete(id)
            setTeams(teams.filter((t) => t.id !== id))
        } catch (err) {
            console.error("Errore nell'eliminazione:", err)
        }
    }
    
    if (loading) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center">Caricamento...</div>
    /* gestione per avviso di elementi non presenti */
    if (teams.length === 0) {
        return (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <BoxIcon/>
                        </EmptyMedia>
                        <EmptyTitle>Nessuna squadra aggiunta</EmptyTitle>
                    </EmptyHeader>
                    <EmptyContent>
                        <TeamCreateButton />
                    </EmptyContent>
                </Empty>
        )
    }
    if (error) return <div className="px-4 min-h-lvh max-w-4xl mx-auto flex items-center justify-center text-red-500">{error}</div>

    
    return (
        <>
            <ItemGroup className="w-full gap-2">
                {teams.map((team) => (
                    <Item key={team.id} variant="outline" className="border-2 border-gray-100 shadow-sm rounded-2xl">
                        <ItemContent className="gap-1">
                            <ItemTitle>{team.name}</ItemTitle>
                            <ItemDescription>Potenza: {team.power}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            {/* modifica */}
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleEditClick(team)}
                            >
                                <Pen />
                            </Button>
                            {/* elimina */}
                            <Button
                                variant="destructive"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleDelete(team.id)}
                            >
                                <Trash2Icon />
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </ItemGroup>

            {/* Modal di modifica */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifica Team</DialogTitle>
                        <DialogDescription>
                            Aggiorna i dettagli del team
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Nome
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="Nome del team"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="power" className="text-sm font-medium">
                                Potenza
                            </label>
                            <input
                                id="power"
                                type="text"
                                value={formData.power}
                                onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="Potenza del team"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Annulla
                        </Button>
                        <Button type="button" onClick={handleSave}>
                            Salva
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TeamCard