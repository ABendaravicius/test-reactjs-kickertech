import { TournamentCard, AddTeamForm, AddScoreForm } from "@/components";
import {
  TournamentProvider,
  useTournament,
} from "@/contexts/TournamentContext";

function AppContent() {
  const { getTournament, getStandings } = useTournament();

  const premierLeagueData = getTournament("premier-league");
  const eurobasketData = getTournament("eurobasket");
  const wimbledonData = getTournament("wimbledon");

  const premierLeagueStandings = getStandings("premier-league");
  const eurobasketStandings = getStandings("eurobasket");
  const wimbledonStandings = getStandings("wimbledon");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sports Tournament Manager
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TournamentCard
            tableName={premierLeagueData.name}
            sportType={premierLeagueData.id}
            standings={premierLeagueStandings}
          >
            <div className="space-y-6">
              <AddTeamForm sportType={premierLeagueData.id} entityName="Team" />
              <AddScoreForm
                sportType={premierLeagueData.id}
                entityName="Team"
              />
            </div>
          </TournamentCard>

          <TournamentCard
            tableName={eurobasketData.name}
            sportType={eurobasketData.id}
            standings={eurobasketStandings}
            iconName="basketball"
            displayMatchHistory
          />

          <TournamentCard
            tableName={wimbledonData.name}
            sportType={wimbledonData.id}
            standings={wimbledonStandings}
            iconName="tennis"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TournamentProvider>
      <AppContent />
    </TournamentProvider>
  );
}

export default App;
