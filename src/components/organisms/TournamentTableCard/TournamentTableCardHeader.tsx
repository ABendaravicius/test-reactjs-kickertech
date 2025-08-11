import { Icon } from "@/components";

interface HeaderProps {
  title: string;
  iconName?: string;
  className?: string;
}

function TournamentTableCardHeader({
  title,
  iconName,
  className = "",
}: HeaderProps) {
  return (
    <div className={`flex items-center gap-4 py-6 px-4 ${className}`}>
      {iconName && <Icon name={iconName} size={32} />}
      <h2>{title}</h2>
    </div>
  );
}

export default TournamentTableCardHeader;
