import type { Player } from "@/types/tournament";
import type { TableHeader } from "@/hooks/useTableHeaders";

interface TableProps {
  headers: TableHeader[];
  data: Player[];
  className?: string;
}

function TournamentTableCardTable({
  headers,
  data,
  className = "",
}: TableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No data available</div>
    );
  }

  return (
    <div className={`overflow-y-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {headers.map((header) => (
              <th
                key={header.id}
                className={`py-2 font-semibold ${
                  header.align === "center"
                    ? "text-center"
                    : header.align === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <tr key={player.id} className="border-b">
              {headers.map((header) => (
                <td
                  key={header.id}
                  className={`py-2 ${
                    header.align === "left" ? "text-left" : "text-center"
                  } ${header.key === "points" && "font-semibold"}`}
                >
                  {player[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentTableCardTable;
