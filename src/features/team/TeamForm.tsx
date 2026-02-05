import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeamService } from "@/features/team/team.service"
import { useState } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"


const TeamForm = () => {
    const [formData, setFormData] = useState({ name: "", power: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    //invio dei dati
    const handleSubmit = async (e: React.FormEvent) => {
        //previene il reload della pagina
        e.preventDefault()
        
        if (!formData.name || !formData.power) {
            setError("Compila tutti i campi")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            await TeamService.create({
                name: formData.name,
                power: formData.power,
            })
            setFormData({ name: "", power: "" })
            setSuccess("Squadra creata con successo!")
            setTimeout(() => setSuccess(null), 3000)
            // Ricarico la pagina una volta creata la squadra
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nella creazione")
        }
        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* campo nome della squadra */}
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>

                        {/* campo nome della squadra */}
                        <Field className="flex flex-col gap-2">
                            <FieldLabel htmlFor="name">Nome della squadra</FieldLabel>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={isSubmitting}
                                placeholder="Ex: Milan"
                            />
                        </Field> 


                        {/* campo potenza della squadra */}
                        <Field className="flex flex-col gap-2">
                            <FieldLabel htmlFor="power">Potenza della squadra</FieldLabel>
                            <Input
                                id="power"
                                value={formData.power}
                                onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                                disabled={isSubmitting}
                                placeholder="Compresa tra 2, 4, 8, 16"
                            />
                        </Field> 
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creazione..." : "Crea Squadra"}
            </Button>
        </form>
    )
}

export default TeamForm