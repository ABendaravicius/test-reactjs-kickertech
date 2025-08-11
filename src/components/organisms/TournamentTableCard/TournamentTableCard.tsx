import type { ReactNode } from "react";
import { default as Header } from "./TournamentTableCardHeader";
import { default as Table } from "./TournamentTableCardTable";
import type { Player, SportType } from "@/types/tournament";
import { useTableHeaders } from "@/hooks/useTableHeaders";

interface TournamentTableCardProps {
  tableName: string;
  iconName?: string;
  className?: string;
  sportType: SportType;
  standings: Player[];
  children?: ReactNode;
}

function TournamentTableCard({
  tableName,
  iconName,
  className = "",
  sportType,
  standings,
  children,
}: TournamentTableCardProps) {
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
        <Table headers={headers} data={standings} />
      </div>
    </div>
  );
}

export default TournamentTableCard;
