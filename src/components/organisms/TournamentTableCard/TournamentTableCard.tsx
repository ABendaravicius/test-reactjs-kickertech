import type { ReactNode } from "react";
import { default as Header } from "./TournamentTableCardHeader";
import { useTournament } from "@/contexts/TournamentContext";
import type { SportType } from "@/types/tournament";

interface TournamentTableCardProps {
  tableName?: string;
  sportType: SportType;
  iconName?: string;
  className?: string;
  children?: ReactNode;
}

function TournamentTableCard({
  tableName,
  sportType,
  iconName,
  className = "",
  children,
}: TournamentTableCardProps) {
  const { getStandings, getTournament } = useTournament();
  const standings = getStandings(sportType);
  const tournament = getTournament(sportType);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <Header
        title={tableName ? tableName : tournament.name}
        iconName={iconName}
        className="border-b border-gray-200"
      />
      <div className="p-4">{children}</div>
    </div>
  );
}

export default TournamentTableCard;
