import { useState } from "react";
import { useTournament } from "@/contexts/TournamentContext";
import type { SportType } from "@/types/tournament";
import { Button } from "@/components";

interface AddTeamFormProps {
  sportType: SportType;
  entityName?: string; // "Team" or "Player"
}

function AddTeamForm({ sportType, entityName = "Team" }: AddTeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const { addPlayer } = useTournament();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (teamName.trim()) {
      const success = addPlayer(sportType, teamName.trim());
      if (success) {
        setTeamName("");
      } else {
        setError(`${entityName} "${teamName.trim()}" already exists`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add {entityName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder={`${entityName} Name`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button type="submit" disabled={!teamName.trim()} className="w-fit">
              Add
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddTeamForm;
