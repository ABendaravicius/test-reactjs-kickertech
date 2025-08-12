import type { Player } from "@/types/tournament";
import type { TableHeader } from "@/hooks/useTableHeaders";

interface TableProps {
  headers: TableHeader[];
  data: Player[];
  className?: string;
  showTableHeader: boolean;
}

function TournamentTableCardTable({
  headers,
  data,
  className = "",
  showTableHeader,
}: TableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No data available</div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {showTableHeader && (
        <h3 className="text-lg font-semibold mb-2">Score table:</h3>
      )}
      <div className={`overflow-y-auto flex-1 ${className}`}>
        <table
          className="w-full text-sm"
          style={{ backgroundColor: "var(--color-table-bg)" }}
        >
          <thead>
            <tr
              className="border-b"
              style={{
                backgroundColor: "var(--color-table-header-bg)",
              }}
            >
              {headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-2 font-semibold border ${
                    header.align === "center"
                      ? "text-center"
                      : header.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                  style={{ borderColor: "var(--color-table-border)" }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((player) => (
              <tr key={player.id}>
                {headers.map((header) => (
                  <td
                    key={header.id}
                    className={`p-2 border ${
                      header.align === "left" ? "text-left" : "text-center"
                    } ${header.key === "points" && "font-semibold"}`}
                    style={{ borderColor: "var(--color-table-border)" }}
                  >
                    {player[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TournamentTableCardTable;
