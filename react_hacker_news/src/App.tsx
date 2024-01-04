import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>HackerNews</h2>
        <Home />
      </header>
    </div>
  );
};

export default App;
