import basketballIcon from "@/assets/basketball.svg";
import tennisIcon from "@/assets/tennis.svg";

interface IconProps {
  name?: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, string> = {
  basketball: basketballIcon,
  tennis: tennisIcon,
};

function Icon({ name, className = "", size = 24 }: IconProps) {
  if (!name || !iconMap[name]) return null;

  return (
    <img
      src={iconMap[name]}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Icon;
