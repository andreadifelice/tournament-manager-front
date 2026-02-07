import { Button } from "@/components/ui/button"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { TournamentService } from "@/features/tournament/tournament.service"
import { TournamentTeamService } from "@/features/tournament_teams/tournament_teams.service"
import { useEffect, useState } from "react"

const TournamentForm = () => {
    const anchorRef = useComboboxAnchor()
    const [formData, setFormData] = useState({ name: "", date: "", location: "" })
    const [availableTeams, setAvailableTeams] = useState<Team[]>([])
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Carica tutte le squadre
                const teams = await TeamService.list()
                
                // Carica i tornei
                const tournaments = await TournamentService.list()

                const usedTeamIds = new Set<number>()

                // Carica tournament_teams per tutti i tornei in parallelo
                const tournamentTeamsPromises = tournaments.map(t => 
                    TournamentTeamService.list(t.id).catch(() => [])
                )
                
                const allTournamentTeams = await Promise.all(tournamentTeamsPromises)
                
                // Estrai gli ID delle squadre
                for (const ttArray of allTournamentTeams) {
                    for (const tt of ttArray) {
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
                
                // Filtra le squadre disponibili
                const filtered = teams.filter((team) => !usedTeamIds.has(team.id))
                setAvailableTeams(filtered)
            } catch (err) {
                console.error("Errore nel caricamento delle squadre:", err)
            }
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

    const fieldData = [
        {
            htmlfor: "name",
            type:"text",
            label: "Nome",
            inputId: "name",
            inputValue: formData.name,
            inputPlaceholder: "Ex: Torneo Primavera"
        },
        {
            htmlfor: "date",
            type:"date",
            label: "Data",
            inputId: "date",
            inputValue: formData.date,
        },
        {
            htmlfor: "location",
            type:"text",
            label: "Luogo",
            inputId: "location",
            inputValue: formData.location,
            inputPlaceholder: "Ex: Milano"
        },
    ]

    const handleFieldChange = (fieldName: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [fieldName]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        {fieldData.map((field) =>
                            <Field key={field.inputId} className="flex flex-col gap-2">
                                <FieldLabel htmlFor={field.htmlfor}>{field.label} torneo</FieldLabel>
                                <Input
                                    id={field.inputId}
                                    type={field.type}
                                    value={field.inputValue}
                                    onChange={handleFieldChange(field.inputId as keyof typeof formData)}
                                    disabled={isSubmitting}
                                    placeholder={field.inputPlaceholder}
                                />
                            </Field>
                        )}
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