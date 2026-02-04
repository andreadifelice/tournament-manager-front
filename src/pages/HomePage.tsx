import TeamCard from "@/components/team_card/TeamCard"

const HomePage = () => {

    return (
        <>
            <div className="px-4 max-w-4xl mx-auto">
                <div className="py-10 flex justify-between">
                    {/* storico tornei */}
                    <div className="w-100 h-125 border-2 border-gray-100 shadow-sm rounded-2xl p-5">
                        <p className="text-3xl text-primary font-bold">Storico tornei</p>
                    </div>
                    {/* lista delle squadre */}
                    <div className="w-100 h-125 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                        <p className="text-3xl text-primary font-bold">Lista delle squadre</p>
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 pe-1">
                            <TeamCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage