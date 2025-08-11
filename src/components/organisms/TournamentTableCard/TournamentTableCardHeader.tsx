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
    <div className={`flex items-center gap-3 p-4 ${className}`}>
      {iconName && <Icon name={iconName} size={32} />}
      <h2 className="text-xl font-bold text-current">{title}</h2>
    </div>
  );
}

export default TournamentTableCardHeader;
