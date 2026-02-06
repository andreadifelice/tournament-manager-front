import TeamCreateButton from "@/features/team/TeamCreateButton";
import TournamentCreateButton from "@/features/tournament/TournamentCreateButton";
import TeamCard from "@/features/team/TeamCard";
import TournamentCard from "@/features/tournament/TournamentCard";
import DivMax4 from "@/components/div/DivMax4";
import DivGrid from "@/components/div/DivGrid";
import DivFlex from "@/components/div/DivFlex";

const HomePage = () => {
    return (
        <>
            {/* contenitore principale */}
            <DivMax4>
                <DivGrid>
                    <DivFlex>
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Tornei in corso</p>
                            <TournamentCreateButton />
                        </div>
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 pe-1 h-100 w-full">
                            <TournamentCard/>
                        </div>
                    </DivFlex>

                    <DivFlex>
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Lista delle squadre</p>
                            <TeamCreateButton />
                        </div>
                        {/* lista delle squadre */}
                        <div className="overflow-auto py-1 pe-1 h-100 w-full">
                            <TeamCard/>
                        </div>
                    </DivFlex>
                </DivGrid>
            </DivMax4>
        </>
    );
};

export default HomePage;
