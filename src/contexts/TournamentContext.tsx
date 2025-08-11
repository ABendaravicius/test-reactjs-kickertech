import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import type {
  TournamentState,
  TournamentContextType,
  SportType,
  Player,
  Match,
  Tournament,
} from "@/types/tournament";

const STORAGE_KEY = "sports-standings-data";

const initialState: TournamentState = {
  tournaments: {
    "premier-league": {
      id: "premier-league",
      name: "Premier League",
      players: [],
      matches: [],
    },
    eurobasket: {
      id: "eurobasket",
      name: "Eurobasket",
      players: [],
      matches: [],
    },
    wimbledon: {
      id: "wimbledon",
      name: "Wimbledon",
      players: [],
      matches: [],
    },
  },
};

type TournamentAction =
  | { type: "LOAD_DATA"; payload: TournamentState }
  | {
      type: "ADD_PLAYER";
      payload: { sportType: SportType; playerName: string };
    }
  | {
      type: "ADD_MATCH";
      payload: {
        sportType: SportType;
        player1Id: string;
        player2Id: string;
        player1Score: number;
        player2Score: number;
      };
    };

const calculatePoints = (wins: number, draws: number): number => {
  return wins * 3 + draws * 1;
};

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const determineMatchResult = (
  player1Score: number,
  player2Score: number
): "player1-win" | "player2-win" | "draw" => {
  if (player1Score > player2Score) return "player1-win";
  if (player2Score > player1Score) return "player2-win";
  return "draw";
};

function tournamentReducer(
  state: TournamentState,
  action: TournamentAction
): TournamentState {
  switch (action.type) {
    case "LOAD_DATA":
      return action.payload;

    case "ADD_PLAYER": {
      const { sportType, playerName } = action.payload;
      const newPlayer: Player = {
        id: generateId(),
        name: playerName,
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
      };

      return {
        ...state,
        tournaments: {
          ...state.tournaments,
          [sportType]: {
            ...state.tournaments[sportType],
            players: [...state.tournaments[sportType].players, newPlayer],
          },
        },
      };
    }

    case "ADD_MATCH": {
      const { sportType, player1Id, player2Id, player1Score, player2Score } =
        action.payload;

      const tournament = state.tournaments[sportType];
      const result = determineMatchResult(player1Score, player2Score);

      const newMatch: Match = {
        id: generateId(),
        player1Id,
        player2Id,
        player1Score,
        player2Score,
        result,
      };

      const updatedPlayers = tournament.players.map((player) => {
        if (player.id === player1Id) {
          const newStats = {
            matchesPlayed: player.matchesPlayed + 1,
            wins: result === "player1-win" ? player.wins + 1 : player.wins,
            draws: result === "draw" ? player.draws + 1 : player.draws,
            losses:
              result === "player2-win" ? player.losses + 1 : player.losses,
          };
          return {
            ...player,
            ...newStats,
            points: calculatePoints(newStats.wins, newStats.draws),
          };
        }
        if (player.id === player2Id) {
          const newStats = {
            matchesPlayed: player.matchesPlayed + 1,
            wins: result === "player2-win" ? player.wins + 1 : player.wins,
            draws: result === "draw" ? player.draws + 1 : player.draws,
            losses:
              result === "player1-win" ? player.losses + 1 : player.losses,
          };
          return {
            ...player,
            ...newStats,
            points: calculatePoints(newStats.wins, newStats.draws),
          };
        }
        return player;
      });

      return {
        ...state,
        tournaments: {
          ...state.tournaments,
          [sportType]: {
            ...tournament,
            players: updatedPlayers,
            matches: [...tournament.matches, newMatch],
          },
        },
      };
    }

    default:
      return state;
  }
}

const TournamentContext = createContext<TournamentContextType | undefined>(
  undefined
);

interface TournamentProviderProps {
  children: ReactNode;
}

export function TournamentProvider({ children }: TournamentProviderProps) {
  const [state, dispatch] = useReducer(tournamentReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "LOAD_DATA", payload: parsedData });
      } catch (error) {
        console.error("Failed to load tournament data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isInitialized]);

  const addPlayer = (sportType: SportType, playerName: string): boolean => {
    const tournament = state.tournaments[sportType];
    const playerExists = tournament.players.some(
      (player) => player.name.toLowerCase() === playerName.toLowerCase()
    );

    if (playerExists) {
      return false;
    }

    dispatch({ type: "ADD_PLAYER", payload: { sportType, playerName } });
    return true;
  };

  const addMatch = (
    sportType: SportType,
    player1Id: string,
    player2Id: string,
    player1Score: number,
    player2Score: number
  ) => {
    dispatch({
      type: "ADD_MATCH",
      payload: { sportType, player1Id, player2Id, player1Score, player2Score },
    });
  };

  const getStandings = (sportType: SportType): Player[] => {
    return [...state.tournaments[sportType].players].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });
  };

  const getTournament = (sportType: SportType): Tournament => {
    return state.tournaments[sportType];
  };

  const value: TournamentContextType = {
    state,
    addPlayer,
    addMatch,
    getStandings,
    getTournament,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}

// Hook to use the context
export function useTournament() {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
}
