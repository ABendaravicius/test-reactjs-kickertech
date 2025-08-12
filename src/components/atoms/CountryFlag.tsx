import ReactCountryFlag from "react-country-flag";

interface CountryFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
}

function CountryFlag({
  countryCode,
  size = 20,
  className = "",
}: CountryFlagProps) {
  // Convert country name to ISO country code if needed
  const getCountryCode = (name: string): string => {
    const countryMap: Record<string, string> = {
      // Common Eurobasket countries
      Spain: "ES",
      France: "FR",
      Germany: "DE",
      Italy: "IT",
      Greece: "GR",
      Serbia: "RS",
      Lithuania: "LT",
      Slovenia: "SI",
      Turkey: "TR",
      Poland: "PL",
      Croatia: "HR",
      "Czech Republic": "CZ",
      Finland: "FI",
      Georgia: "GE",
      Montenegro: "ME",
      Ukraine: "UA",
      Latvia: "LV",
      Estonia: "EE",
      "Bosnia and Herzegovina": "BA",
      "North Macedonia": "MK",
      Bulgaria: "BG",
      Hungary: "HU",
      Netherlands: "NL",
      Belgium: "BE",
      Israel: "IL",
      Russia: "RU",
    };

    // If it's already a country code (2 letters), return uppercase
    if (name.length === 2) {
      return name.toUpperCase();
    }

    // Otherwise, look up the country name
    return countryMap[name] || name.toUpperCase().slice(0, 2);
  };

  const code = getCountryCode(countryCode);

  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      style={{
        width: `${size}px`,
        height: `${Math.round(size * 0.75)}px`,
      }}
      title={countryCode}
      className={`inline-block rounded-sm ${className}`}
    />
  );
}

export default CountryFlag;
