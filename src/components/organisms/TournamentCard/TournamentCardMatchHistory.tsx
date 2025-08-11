import type { SportType } from "@/types/tournament";
import { useTournament } from "@/contexts/TournamentContext";

interface MatchHistoryProps {
  sportType: SportType;
}

function TournamentCardMatchHistory({ sportType }: MatchHistoryProps) {
  const { getTournament } = useTournament();
  const { matches, players } = getTournament(sportType);

  const getPlayerName = (playerId: string): string => {
    const player = players.find((player) => player.id === playerId);
    return player ? player.name : "Unknown Participant";
  };

  return (
    matches.length > 0 && (
      <div className="space-y-2">
        <h4 className="text-md font-semibold">Match History</h4>
        <ul className="divide-y divide-gray-200">
          {matches.map((match, index) => (
            <li key={index} className="py-2 text-sm">
              <div className="flex justify-between items-center">
                <span>
                  {getPlayerName(match.player1Id)} vs{" "}
                  {getPlayerName(match.player2Id)}
                </span>
                <span className="font-medium">
                  {match.player1Score} - {match.player2Score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default TournamentCardMatchHistory;
