import TeamForm from "@/components/form/TeamForm"
import TeamCard from "@/components/team_card/TeamCard"

const Teams = () => {
    return (
        <div className="px-4 max-w-4xl mx-auto">
            <div className="py-10 flex justify-between gap-5">
                {/* form creazione squadre */}
                <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-3xl text-primary font-bold">Crea la tua squadra</p>
                    <TeamForm />
                </div>
                {/* lista delle squadre */}
                <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-3xl text-primary font-bold">Lista delle squadre</p>
                    {/* contenitore scrollabile */}
                    <div className="h-full flex justify-center items-center">
                        <div className="overflow-auto py-1 pe-1 w-full">
                            <TeamCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams