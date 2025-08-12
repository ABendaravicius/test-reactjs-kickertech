import type { SportType } from "@/types/tournament";
import { useTournament } from "@/contexts/TournamentContext";
import { CountryFlag } from "@/components";

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

  const renderPlayerName = (playerId: string) => {
    const playerName = getPlayerName(playerId);

    // Show flags only for Eurobasket
    if (sportType === "eurobasket") {
      return (
        <span className="flex items-center gap-1">
          <CountryFlag countryCode={playerName} size={16} />
          {playerName}
        </span>
      );
    }

    return playerName;
  };

  return (
    matches.length > 0 && (
      <div className="space-y-2 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {matches.map((match, index) => (
            <li key={index} className="py-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  {renderPlayerName(match.player1Id)}
                  <span>vs</span>
                  {renderPlayerName(match.player2Id)}
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
