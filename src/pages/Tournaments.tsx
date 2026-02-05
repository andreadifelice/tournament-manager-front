import TournamentCard from "@/features/tournament/TournamentCard"
import TournamentForm from "@/features/tournament/TournamentForm"

const Tournaments = () => {
    return (
        <div className="px-4 w-full md:max-w-4xl mx-auto">
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:justify-between">
                {/* form creazione tornei */}
                <div className="w-full lg:flex-1 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Crea un torneo</p>
                    <div className="w-full h-full flex justify-center items-start">
                        <TournamentForm/>
                    </div>
                </div>
                
                {/* lista delle tornei */}
                <div className="w-full lg:flex-1 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Lista dei tornei</p>
                    <div className="h-full flex justify-center items-center">
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 pe-1 h-100 w-full">
                            <TournamentCard/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tournaments