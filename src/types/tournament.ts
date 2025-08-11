export type SportType = "premier-league" | "eurobasket" | "wimbledon";

export interface Player {
  id: string;
  name: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Score: number;
  player2Score: number;
  result: "player1-win" | "player2-win" | "draw";
}

export interface Tournament {
  id: SportType;
  name: string;
  players: Player[];
  matches: Match[];
}

export interface TournamentState {
  tournaments: Record<SportType, Tournament>;
}

export interface TournamentContextType {
  state: TournamentState;
  addPlayer: (sportType: SportType, playerName: string) => boolean;
  addMatch: (
    sportType: SportType,
    player1Id: string,
    player2Id: string,
    player1Score: number,
    player2Score: number
  ) => void;
  getStandings: (sportType: SportType) => Player[];
  getTournament: (sportType: SportType) => Tournament;
}
