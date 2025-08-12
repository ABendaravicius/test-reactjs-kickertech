import {
  TournamentCard,
  AddTeamForm,
  AddScoreForm,
  Modal,
  Button,
} from "@/components";
import { useState } from "react";
import {
  TournamentProvider,
  useTournament,
} from "@/contexts/TournamentContext";

function AppContent() {
  const { getTournament, getStandings } = useTournament();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "addTeam" | "addScore" | null;
    sportType: string | null;
    entityName: string;
  }>({
    isOpen: false,
    type: null,
    sportType: null,
    entityName: "Team",
  });

  const premierLeagueData = getTournament("premier-league");
  const eurobasketData = getTournament("eurobasket");
  const wimbledonData = getTournament("wimbledon");

  const premierLeagueStandings = getStandings("premier-league");
  const eurobasketStandings = getStandings("eurobasket");
  const wimbledonStandings = getStandings("wimbledon");

  const openModal = (
    type: "addTeam" | "addScore",
    sportType: string,
    entityName: string = "Team"
  ) => {
    setModalState({ isOpen: true, type, sportType, entityName });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      sportType: null,
      entityName: "Team",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sports Standings Manager
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TournamentCard
            tableName={premierLeagueData.name}
            sportType={premierLeagueData.id}
            standings={premierLeagueStandings}
            showTableHeader={false}
            headerClassName="text-2xl font-semibold"
            theme={premierLeagueData.id}
            className="font-sans"
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
            headerClassName="text-2xl uppercase tracking-wider"
            iconName="basketball"
            displayMatchHistory
            theme={eurobasketData.id}
            className="font-sport text-white"
          >
            <div className="flex gap-3 justify-between text-sm">
              <Button
                onClick={() => openModal("addTeam", "eurobasket", "Team")}
                className="py-1.5! px-2!"
                iconName="Plus"
                iconSize={20}
              >
                Add Team
              </Button>
              <Button
                onClick={() => openModal("addScore", "eurobasket", "Team")}
                className="py-1.5! px-2!"
                iconName="Plus"
                iconSize={20}
              >
                Add Score
              </Button>
            </div>
          </TournamentCard>

          <TournamentCard
            tableName={wimbledonData.name}
            sportType={wimbledonData.id}
            standings={wimbledonStandings}
            showTableHeader={false}
            headerClassName="text-3xl font-semibold"
            iconName="tennis"
            theme={wimbledonData.id}
            className="font-mono"
          >
            <div className="flex gap-3 justify-between text-lg">
              <Button
                onClick={() => openModal("addTeam", "wimbledon", "Player")}
                iconName="Plus"
                iconSize={24}
              >
                Add Player
              </Button>
              <Button
                onClick={() => openModal("addScore", "wimbledon", "Player")}
                iconName="Plus"
                iconSize={24}
                variant="secondary"
              >
                Add Score
              </Button>
            </div>
          </TournamentCard>
        </div>

        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={
            modalState.type === "addTeam"
              ? `Add ${modalState.entityName}`
              : `Add Score`
          }
        >
          {modalState.type === "addTeam" && modalState.sportType && (
            <AddTeamForm
              sportType={modalState.sportType as any}
              entityName={modalState.entityName}
              onSuccess={closeModal}
              autoFocus={true}
            />
          )}
          {modalState.type === "addScore" && modalState.sportType && (
            <AddScoreForm
              sportType={modalState.sportType as any}
              entityName={modalState.entityName}
              onSuccess={closeModal}
            />
          )}
        </Modal>
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
