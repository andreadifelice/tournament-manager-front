import { myFetch } from "@/lib/backend";
import myEnv from "@/lib/env";
import type { ServerTournament, Tournament } from "./tournament.type";

export class TournamentService {
    static async list(id?: number): Promise<Tournament[]> {
        console.log(myEnv.backendApiUrl)
        const teams = await myFetch<ServerTournament[]>(`${myEnv.backendApiUrl}/tournaments${id ? "?id=" + id : ""}`);
        return teams;
    }

    static async get(id: number): Promise<Tournament | undefined> {
        const team = await myFetch<ServerTournament>(`${myEnv.backendApiUrl}/tournaments/${id}`);
        return team;
    }

    static async create(team: Omit<Tournament, 'id'>): Promise<Tournament> {
        const newTournament = await myFetch<Tournament>(`${myEnv.backendApiUrl}/tournaments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });
        return newTournament;
    }
}