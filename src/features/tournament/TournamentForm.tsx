import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { TournamentService } from "@/features/tournament/tournament.service"
import { TeamService } from "@/features/team/team.service"
import { TournamentTeamService } from "@/features/tournament_teams/tournament_teams.service"
import type { Team } from "@/features/team/team.type"
import { useEffect, useRef, useState } from "react"

const TournamentForm = () => {
    const anchorRef = useComboboxAnchor()
    const [formData, setFormData] = useState({ name: "", date: "", location: "" })
    const [teams, setTeams] = useState<Team[]>([])
    const [availableTeams, setAvailableTeams] = useState<Team[]>([])
    const [teamLoading, setTeamLoading] = useState(true)
    const [teamError, setTeamError] = useState<string | null>(null)
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Carica tutte le squadre
                const allTeams = await TeamService.list()
                console.log("Squadre caricate:", allTeams)
                setTeams(allTeams)
                
                // Carica i tornei
                const tournaments = await TournamentService.list()
                console.log("Tornei caricati:", tournaments)
                
                const usedTeamIds = new Set<number>()

                // Carica tournament_teams per tutti i tornei in parallelo
                const tournamentTeamsPromises = tournaments.map(t => 
                    TournamentTeamService.list(t.id).catch(() => [])
                )
                
                const allTournamentTeams = await Promise.all(tournamentTeamsPromises)
                console.log("Tutti i tournament_teams:", allTournamentTeams)
                
                // Estrai gli ID delle squadre
                for (const ttArray of allTournamentTeams) {
                    for (const tt of ttArray) {
                        console.log("Verificando tt.team_id:", tt.team_id, "tipo:", typeof tt.team_id)
                        
                        if (tt.team_id) {
                            // Se è un array
                            if (Array.isArray(tt.team_id)) {
                                tt.team_id.forEach((teamId: number) => usedTeamIds.add(teamId))
                            }
                            // Se è un numero singolo
                            else if (typeof tt.team_id === 'number') {
                                usedTeamIds.add(tt.team_id)
                            }
                        }
                    }
                }
                
                console.log("Team IDs usati:", Array.from(usedTeamIds))
                
                // Filtra le squadre disponibili
                const filtered = allTeams.filter((team) => !usedTeamIds.has(team.id))
                console.log("availableTeams impostato a:", filtered)
                
                setAvailableTeams(filtered)
            } catch (err) {
                console.error("Errore:", err)
                setTeamError(err instanceof Error ? err.message : "Errore nel caricamento delle squadre")
            }
            setTeamLoading(false)
        }

        fetchTeams()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        //previene il reload della pagina
        e.preventDefault()

        if (!formData.name || !formData.date || !formData.location) {
            setError("Compila tutti i campi")
            return
        }

        if (selectedTeamIds.length === 0) {
            setError("Seleziona almeno una squadra")
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
                teams: selectedTeamIds.map(id => parseInt(id, 10)),
            })
            setFormData({ name: "", date: "", location: "" })
            setSelectedTeamIds([])
            setSuccess("Torneo creato con successo!")
            setTimeout(() => setSuccess(null), 3000)
            // Ricarico la pagina una volta creato il torneo
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
                            <FieldLabel>Squadre partecipanti</FieldLabel>
                            <Combobox
                                multiple
                                items={availableTeams.map(t => t.name)}
                                value={availableTeams
                                    .filter(t => selectedTeamIds.includes(t.id.toString()))
                                    .map(t => t.name)
                                }
                                onValueChange={(values) => {
                                    const newIds = values.map(name => {
                                        const team = availableTeams.find(t => t.name === name)
                                        return team?.id.toString() || ""
                                    }).filter(id => id !== "")
                                    setSelectedTeamIds(newIds)
                                }}
                            >
                                <ComboboxChips ref={anchorRef} className="w-full">
                                    <ComboboxValue>
                                        {(values) => (
                                            <>
                                                {values.map((value: string) => (
                                                    <ComboboxChip key={value}>
                                                        {value}
                                                    </ComboboxChip>
                                                ))}
                                                <ComboboxChipsInput
                                                    placeholder={selectedTeamIds.length === 0 ? "Seleziona squadre..." : ""}
                                                    disabled={isSubmitting}
                                                />
                                            </>
                                        )}
                                    </ComboboxValue>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchorRef}>
                                    <ComboboxEmpty>Nessuna squadra disponibile</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
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