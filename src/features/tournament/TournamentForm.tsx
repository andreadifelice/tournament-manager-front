import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { TournamentService } from "@/features/tournament/tournament.service"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { useEffect, useState } from "react"

const TournamentForm = () => {
    const [formData, setFormData] = useState({ name: "", date: "", location: "" })
    const [teams, setTeams] = useState<Team[]>([])
    const [teamLoading, setTeamLoading] = useState(true)
    const [teamError, setTeamError] = useState<string | null>(null)
    const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await TeamService.list()
                setTeams(data)
            } catch (err) {
                setTeamError(err instanceof Error ? err.message : "Errore nel caricamento delle squadre")
            }
            setTeamLoading(false)
        }
        fetchTeams()
    }, [])

    const handleTeamToggle = (id: number) => {
        setSelectedTeamIds((prev) =>
            prev.includes(id) ? prev.filter((teamId) => teamId !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.date || !formData.location) {
            setError("Compila tutti i campi")
            return
        }

        if (selectedTeamIds.length < 2) {
            setError("Seleziona almeno 2 squadre")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            await TournamentService.create({
                name: formData.name,
                date: formData.date,
                location: formData.location,
                teams: selectedTeamIds,
            })
            setFormData({ name: "", date: "", location: "" })
            setSelectedTeamIds([])
            setSuccess("Torneo creato con successo!")
            setTimeout(() => setSuccess(null), 3000)
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nella creazione")
        }

        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <Field className="flex flex-col gap-2">
                            <FieldLabel htmlFor="name">Nome torneo</FieldLabel>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={isSubmitting}
                                placeholder="Ex: Torneo Primavera"
                            />
                        </Field>

                        <Field className="flex flex-col gap-2">
                            <FieldLabel htmlFor="date">Data</FieldLabel>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </Field>

                        <Field className="flex flex-col gap-2">
                            <FieldLabel htmlFor="location">Luogo</FieldLabel>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                disabled={isSubmitting}
                                placeholder="Ex: Milano"
                            />
                        </Field>

                        <Field className="flex flex-col gap-2">
                            <FieldLabel>Squadre</FieldLabel>
                            <div className="flex flex-col gap-2 rounded-md border border-input p-3">
                                {teamLoading && (
                                    <p className="text-sm text-muted-foreground">Caricamento squadre...</p>
                                )}
                                {teamError && (
                                    <p className="text-sm text-red-500">{teamError}</p>
                                )}
                                {!teamLoading && !teamError && teams.length === 0 && (
                                    <p className="text-sm text-muted-foreground">Nessuna squadra disponibile</p>
                                )}
                                {!teamLoading && !teamError && teams.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        {teams.map((team) => (
                                            <label key={team.id} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4"
                                                    checked={selectedTeamIds.includes(team.id)}
                                                    onChange={() => handleTeamToggle(team.id)}
                                                    disabled={isSubmitting}
                                                />
                                                {team.name}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creazione..." : "Crea Torneo"}
            </Button>
        </form>
    )
}

export default TournamentForm