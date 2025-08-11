import type { SportType } from "@/types/tournament";

export interface TableHeader {
  id: string;
  label: string;
  key: keyof Player;
  align?: "left" | "center" | "right";
}

// Import Player type for the key mapping
import type { Player } from "@/types/tournament";

const TABLE_HEADERS: Record<SportType, TableHeader[]> = {
  "premier-league": [
    { id: "team", label: "Team", key: "name", align: "left" },
    { id: "played", label: "P", key: "matchesPlayed", align: "center" },
    { id: "wins", label: "W", key: "wins", align: "center" },
    { id: "draws", label: "D", key: "draws", align: "center" },
    { id: "losses", label: "L", key: "losses", align: "center" },
    { id: "points", label: "Pts", key: "points", align: "center" },
  ],
  eurobasket: [
    { id: "team", label: "Team", key: "name", align: "left" },
    { id: "wins", label: "W", key: "wins", align: "center" },
    { id: "losses", label: "L", key: "losses", align: "center" },
    { id: "draws", label: "D", key: "draws", align: "center" },
    { id: "points", label: "Pts", key: "points", align: "center" },
  ],
  wimbledon: [
    { id: "player", label: "Player", key: "name", align: "left" },
    { id: "matches", label: "M", key: "matchesPlayed", align: "center" },
    { id: "wins", label: "W", key: "wins", align: "center" },
    { id: "losses", label: "L", key: "losses", align: "center" },
    { id: "points", label: "Pts", key: "points", align: "center" },
  ],
};

export function useTableHeaders(sportType: SportType): TableHeader[] {
  return TABLE_HEADERS[sportType];
}
