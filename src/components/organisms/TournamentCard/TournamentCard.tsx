import type { ReactNode } from "react";
import { default as Header } from "./TournamentCardHeader";
import { default as Table } from "./TournamentCardTable";
import { default as MatchHistory } from "./TournamentCardMatchHistory";
import type { Player, SportType } from "@/types/tournament";
import { useTableHeaders } from "@/hooks/useTableHeaders";

interface TournamentCardProps {
  tableName: string;
  iconName?: string;
  className?: string;
  sportType: SportType;
  standings: Player[];
  children?: ReactNode;
  displayMatchHistory?: boolean;
  showTableHeader?: boolean;
}

function TournamentCard({
  tableName,
  iconName,
  className = "",
  sportType,
  standings,
  children,
  displayMatchHistory = false,
  showTableHeader = true,
}: TournamentCardProps) {
  const headers = useTableHeaders(sportType);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <Header
        title={tableName}
        iconName={iconName}
        className="border-b border-gray-200"
      />
      <div className="p-4 space-y-4">
        {children}
        {displayMatchHistory && <MatchHistory sportType={sportType} />}
        <Table
          headers={headers}
          data={standings}
          showTableHeader={showTableHeader}
        />
      </div>
    </div>
  );
}

export default TournamentCard;
