import SuperiorWinners from "./components/SuperiorWinners.";
import WinnersList from "./components/WinnersList";

function App() {
  return (
    <div style={{
      display: "flex",
    }}>
      <WinnersList />
      <SuperiorWinners/>
    </div>
  );
}

export default App;
