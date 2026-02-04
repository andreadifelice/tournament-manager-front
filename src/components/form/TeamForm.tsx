import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeamService } from "@/features/team/team.service"
import { useState } from "react"


const TeamForm = () => {
    const [formData, setFormData] = useState({ name: "", power: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    //invion dei dati
    const handleSubmit = async (e: React.FormEvent) => {
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
            // Ricarico la lista una volta creata la squadra
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nella creazione")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {/* campo nome della squadra */}
                <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Es. AC Milan"
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex flex-col gap-2">
                {/* campo potenza della squadra */}
                <Input
                    id="power"
                    type="text"
                    value={formData.power}
                    onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                    placeholder="Es. 2"
                    disabled={isSubmitting}
                />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creazione..." : "Crea Squadra"}
            </Button>
        </form>
    )
}

export default TeamForm