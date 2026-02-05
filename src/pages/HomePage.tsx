import TeamCreateButton from "@/features/team/TeamCreateButton";
import TournamentCreateButton from "@/features/tournament/TournamentCreateButton";
import TeamCard from "@/features/team/TeamCard";
import TournamentCard from "@/features/tournament/TournamentCard";

const HomePage = () => {
    return (
        <>
            {/* contenitore principale */}
            <div className="px-4 max-w-4xl mx-auto">
                <div className="py-10 flex justify-between">
                    <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5 justify-between">
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Tornei in corso</p>
                            <TournamentCreateButton />
                        </div>
                        {/* storico tornei */}
                        <div className="h-50 overflow-auto py-1 pe-1 w-full">
                        <TournamentCard />
                    </div>
                    </div>

                    <div className="w-100 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Lista delle squadre</p>
                            <TeamCreateButton />
                        </div>
                        {/* lista delle squadre */}
                        <div className="h-50 overflow-auto py-1 pe-1 w-full">
                            <TeamCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
