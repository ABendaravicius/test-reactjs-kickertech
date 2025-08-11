import { useState } from "react";
import { useTournament } from "@/contexts/TournamentContext";
import type { SportType } from "@/types/tournament";
import { Button } from "@/components";

interface AddScoreFormProps {
  sportType: SportType;
  entityName?: string; // "Team" or "Player"
  onSuccess?: () => void;
}

function AddScoreForm({
  sportType,
  entityName = "Team",
  onSuccess,
}: AddScoreFormProps) {
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [error, setError] = useState("");

  const { addMatch, getTournament } = useTournament();
  const { matches, players } = getTournament(sportType);

  const hasMatchBeenPlayed = (
    player1Id: string,
    player2Id: string
  ): boolean => {
    return matches.some(
      (match) =>
        (match.player1Id === player1Id && match.player2Id === player2Id) ||
        (match.player1Id === player2Id && match.player2Id === player1Id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!homeTeamId || !awayTeamId) {
      setError(`Please select both ${entityName.toLowerCase()}s`);
      return;
    }

    if (homeTeamId === awayTeamId) {
      setError(`A ${entityName.toLowerCase()} cannot play against itself`);
      return;
    }

    if (!homeScore.trim() || !awayScore.trim()) {
      setError("Please enter scores for both teams");
      return;
    }

    const homeScoreNum = parseInt(homeScore);
    const awayScoreNum = parseInt(awayScore);

    if (
      isNaN(homeScoreNum) ||
      isNaN(awayScoreNum) ||
      homeScoreNum < 0 ||
      awayScoreNum < 0
    ) {
      setError("Please enter valid scores (0 or higher)");
      return;
    }

    if (hasMatchBeenPlayed(homeTeamId, awayTeamId)) {
      setError("This match has already been played");
      return;
    }

    addMatch(sportType, homeTeamId, awayTeamId, homeScoreNum, awayScoreNum);

    setHomeTeamId("");
    setAwayTeamId("");
    setHomeScore("");
    setAwayScore("");
    onSuccess?.();
  };

  const isFormValid =
    homeTeamId && awayTeamId && homeScore.trim() && awayScore.trim();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add Score</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              value={homeTeamId}
              onChange={(e) => setHomeTeamId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Home {entityName}
              </option>
              {players
                .filter((player) => player.id !== awayTeamId)
                .map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select
              value={awayTeamId}
              onChange={(e) => setAwayTeamId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Away {entityName}
              </option>
              {players
                .filter((player) => player.id !== homeTeamId)
                .map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              min="0"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              placeholder="Home Score"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="number"
              min="0"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              placeholder="Away Score"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <Button type="submit" disabled={!isFormValid} className="w-full">
          Add Score
        </Button>
      </form>
    </div>
  );
}

export default AddScoreForm;
