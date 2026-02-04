import TeamCard from "@/components/team_card/TeamCard"

const Teams = () => {
    return (
        <div className="px-4 max-w-4xl mx-auto">
            <div className="py-10 flex flex-col gap-10">
                <p className="text-3xl text-primary font-bold">Lista delle squadre</p>
                <TeamCard />
            </div>
        </div>
    )
}

export default Teams