import { TournamentTableCard } from "@/components";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sports Standings Manager
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TournamentTableCard tableName="Premier League" />

          <TournamentTableCard tableName="Eurobasket" iconName="basketball" />

          <TournamentTableCard tableName="Wimbledon" iconName="tennis" />
        </div>
      </div>
    </div>
  );
}

export default App;
