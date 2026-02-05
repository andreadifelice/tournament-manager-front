import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { BoxIcon, LoaderCircle, OctagonAlert, Pen, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const TeamCard = () => {


    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editing, setEditing] = useState<Team | null>(null)
    const [deleting, setDeleting] = useState<Team | null>(null)
    const [formData, setFormData] = useState({ name: "", power: "" })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)



    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await TeamService.list()
                setTeams(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            }
            setLoading(false)
        }
        fetch()
    }, [])



    // gestione per modifica del team
    const handleEdit = (team: Team) => {
        setEditing(team)
        setFormData({ name: team.name, power: team.power || "" })
        setIsModalOpen(true)
    }
    // update della squadra
    const handleSave = async () => {
        if (!editing) return
        try {
            await TeamService.update(editing.id, {
                name: formData.name,
                power: formData.power,
            })
            setTeams(
                teams.map((t) => 
                    t.id === editing.id ? { ...t, name: formData.name, power: formData.power }: t
                )
            )
            setIsModalOpen(false)
            setEditing(null)
        } catch (err) {
            console.error("Errore nell'aggiornamento:", err)
        }
    }



    // gestione per eliminazione del team
    const handleDelete = (team: Team) => {
        setDeleting(team)
        setIsDeleteModalOpen(true)
    }
    //Conferma eliminazione
    const handleDeleteConfirm = async () => {
        if (!deleting) return
        try {
            await TeamService.delete(deleting.id)
            setTeams(teams.filter((t) => t.id !== deleting.id))
            setIsDeleteModalOpen(false)
            setDeleting(null)
        } catch (err) {
            console.error("Errore nell'eliminazione:", err)
        }
    }
    

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
    if (teams.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <BoxIcon/>
                    </EmptyMedia>
                    <EmptyTitle>Nessuna squadra aggiunta</EmptyTitle>
                </EmptyHeader>
            </Empty>
        )
    }
    
    /* gestione per errore durante il caricamento degli elementi */
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
        <>
            {/* form creazione squadra */}
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
                                onClick={() => handleEdit(team)}
                            >
                                <Pen />
                            </Button>
                            {/* elimina */}
                            <Button
                                variant="destructive"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleDelete(team)}
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
                        <DialogTitle>Modifica squadra</DialogTitle>
                        <DialogDescription>Aggiorna i dettagli della squadra</DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>


                                {/* campo nome della squadra */}
                                <Field className="flex flex-col gap-2">
                                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Nome della squadra"
                                    />
                                </Field> 


                                {/* campo potenza della squadra */}
                                <Field className="flex flex-col gap-2">
                                    <FieldLabel htmlFor="power">Potenza</FieldLabel>
                                    <Input
                                        id="power"
                                        value={formData.power}
                                        onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                                        placeholder="Potenza della squadra"
                                    />
                                </Field> 


                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <DialogFooter>
                        {/* annulla il salvataggio */}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Annulla
                        </Button>
                        {/* conferma il salvataggio */}
                        <Button 
                            type="button" 
                            onClick={handleSave}
                        >
                            Salva
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Modal di eliminazione */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Elimina squadra</DialogTitle>
                        <DialogDescription>
                            Sei sicuro di voler eliminare la squadra {deleting ? ` "${deleting.name}"` : ""}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {/* annulla eliminazione */}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Annulla
                        </Button>
                        {/* conferma eliminazione */}
                        <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={handleDeleteConfirm}
                        >
                            Elimina
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TeamCard