import { TournamentTableCard } from "@/components";
import { TournamentProvider } from "@/contexts/TournamentContext";

function App() {
  return (
    <TournamentProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Sports Tournament Manager
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TournamentTableCard sportType="premier-league" />
            <TournamentTableCard sportType="eurobasket" iconName="basketball" />
            <TournamentTableCard sportType="wimbledon" iconName="tennis" />
          </div>
        </div>
      </div>
    </TournamentProvider>
  );
}

export default App;
