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
    <div
      className="flex items-center gap-4 py-5 px-4 h-19"
      style={{
        backgroundColor: "var(--color-header)",
        color: "var(--color-header-text)",
      }}
    >
      {iconName && <Icon name={iconName} size={32} />}
      <h2 className={className}>{title}</h2>
    </div>
  );
}

export default TournamentTableCardHeader;
