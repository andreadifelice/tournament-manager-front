import TeamForm from "@/features/team/TeamForm"
import TeamCard from "@/features/team/TeamCard"

const Teams = () => {
    return (
        <div className="px-4 w-full md:max-w-4xl mx-auto">
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:justify-between">
                {/* form creazione squadre */}
                <div className="w-full lg:flex-1  h-80 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Crea la tua squadra</p>
                    <div className="w-full h-full flex justify-center items-start">
                        <TeamForm />
                    </div>
                </div>
                
                {/* lista delle squadre */}
                <div className="w-full lg:flex-1  h-80 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Lista delle squadre</p>
                    {/* contenitore scrollabile */}
                    <div className="overflow-auto py-1 pe-1 h-100 w-full">
                        <TeamCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams