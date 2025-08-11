import type { ReactNode } from "react";
import { default as Header } from "./TournamentTableCardHeader";

interface TournamentTableCardProps {
  tableName: string;
  iconName?: string;
  className?: string;
  children?: ReactNode;
}

function TournamentTableCard({
  tableName,
  iconName,
  className = "",
  children,
}: TournamentTableCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <Header
        title={tableName}
        iconName={iconName}
        className="bg-gray-50 border-b border-gray-200"
      />
      <div className="p-4">{children}</div>
    </div>
  );
}

export default TournamentTableCard;
