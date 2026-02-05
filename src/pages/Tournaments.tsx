import TournamentForm from "@/features/tournament/TournamentForm"

const Tournaments = () => {
    return (
        <div className="px-4 max-w-4xl mx-auto">
            <div className="py-10 flex justify-between gap-5">
                {/* form creazione tornei */}
                <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Crea un torneo</p>
                    <div className="w-full h-full flex justify-center items-start">
                        <TournamentForm/>
                    </div>
                </div>
                
                {/* lista delle tornei */}
                <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                    <p className="text-xl text-primary font-bold">Lista dei tornei</p>
                    <div className="h-full flex justify-center items-center">
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 pe-1 w-full">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tournaments