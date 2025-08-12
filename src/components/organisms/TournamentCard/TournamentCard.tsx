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
  headerClassName?: string;
  sportType: SportType;
  standings: Player[];
  children?: ReactNode;
  displayMatchHistory?: boolean;
  showTableHeader?: boolean;
  theme?: string;
}

function TournamentCard({
  tableName,
  iconName,
  headerClassName,
  className = "",
  sportType,
  standings,
  children,
  displayMatchHistory = false,
  showTableHeader = true,
  theme,
}: TournamentCardProps) {
  const headers = useTableHeaders(sportType);

  return (
    <div
      className={`flex flex-col max-h-160 bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--color-card-background)" }}
      data-theme={theme}
    >
      <Header
        title={tableName}
        iconName={iconName}
        className={headerClassName}
      />
      <div className="flex-1 flex flex-col p-4 space-y-4 min-h-0">
        {children}
        {displayMatchHistory && <MatchHistory sportType={sportType} />}
        <div className="flex-1 min-h-0">
          <Table
            headers={headers}
            data={standings}
            showTableHeader={showTableHeader}
          />
        </div>
      </div>
    </div>
  );
}

export default TournamentCard;
