import { myFetch } from "@/lib/backend";
import myEnv from "@/lib/env";
import type { Game, ServerGame } from "./game.type";

export class GameService {

    /**
     * GET /api/games/{id} - Ottiene i dettagli di una singola partita
     */
    static async getById(id: number): Promise<Game> {
        const response = await myFetch<ServerGame>(
            `${myEnv.backendApiUrl}/games/${id}`
        );
        return response;
    }

    /**
     * PATCH /api/games/{id} - Salva i risultati e avanza al round successivo
     */
    static async updateResult(id: number, score_a: number, score_b: number): Promise<Game> {
        const response = await myFetch<ServerGame>(
            `${myEnv.backendApiUrl}/games/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ score_a, score_b })
            }
        );
        return response;
    }

    /**
     * POST /api/games/{tournament_id} - Crea una nuova partita
     */
    static async create(data: Omit<Game, 'id'>): Promise<Game> {
        const newGame = await myFetch<ServerGame>(
            `${myEnv.backendApiUrl}/games/${data.tournament_id}`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        return newGame;
    }

    /**
     * GET /api/games/{tournament_id}/teams - Lista le partite di un torneo
     */
    static async list(tournamentId: number): Promise<Game[]> {
        const response = await myFetch<ServerGame[]>(
            `${myEnv.backendApiUrl}/games/${tournamentId}/teams`
        );
        return response;
    }
}