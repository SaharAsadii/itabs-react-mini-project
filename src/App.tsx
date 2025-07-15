import { SmartMatch } from "@/features";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Match Dashboard</h1>
      </header>

      <main className="app-main">
        <div className="app-drawer" />
        <SmartMatch />
      </main>
    </div>
  );
};

export default App;
