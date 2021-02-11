import './App.css';
import Dashboard from './features/dashboard/dashboard';
import Navbar from './features/navbar/navbar';

function App() {
  return (
    <div className="App darkGradient">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
