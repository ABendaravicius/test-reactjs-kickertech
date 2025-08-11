interface IconProps {
  name?: string;
  className?: string;
  size?: number;
}

function Icon({ name, className = "", size = 24 }: IconProps) {
  if (!name) return null;

  return (
    <img
      src={`/src/assets/${name}.svg`}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      onError={(e) => {
        // Hide icon if it fails to load
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

export default Icon;
